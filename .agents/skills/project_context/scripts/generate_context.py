#!/usr/bin/env python3
import os
import json

def get_directory_tree(startpath, max_depth=3):
    tree_lines = []
    # Directories we want to completely ignore
    ignore_dirs = {'node_modules', 'out', 'dist', 'build', '__pycache__', 'coverage'}
    
    startpath = os.path.abspath(startpath)
    for root, dirs, files in os.walk(startpath):
        # Filter directories in-place to prune the traversal tree
        pruned_dirs = []
        for d in dirs:
            # Ignore hidden directories (starting with .) unless it's .github or .vscode
            if d.startswith('.') and d not in {'.github', '.vscode'}:
                continue
            if d in ignore_dirs:
                continue
            pruned_dirs.append(d)
        
        dirs[:] = sorted(pruned_dirs)
        
        depth = os.path.relpath(root, startpath).count(os.sep)
        if depth > max_depth:
            continue
            
        indent = '  ' * depth
        subdir = os.path.basename(root)
        if subdir and root != startpath:
            tree_lines.append(f"{indent}📁 {subdir}/")
        elif root == startpath:
            tree_lines.append(f"📁 {os.path.basename(startpath)}/")
            
        sub_indent = '  ' * (depth + 1)
        for f in sorted(files):
            # Ignore hidden files in files listing if necessary, or show them
            tree_lines.append(f"{sub_indent}📄 {f}")
            
    return "\n".join(tree_lines)

def analyze_package_json(filepath):
    if not os.path.exists(filepath):
        return None
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return {
            "name": data.get("name", "N/A"),
            "version": data.get("version", "N/A"),
            "scripts": data.get("scripts", {}),
            "dependencies": data.get("dependencies", {}),
            "devDependencies": data.get("devDependencies", {})
        }
    except Exception as e:
        return f"Error reading package.json: {e}"

def generate_summary():
    project_dir = os.getcwd()
    summary = []
    summary.append("# Resumen de Contexto del Proyecto\n")
    summary.append(f"**Ruta del Proyecto:** `{project_dir}`\n")
    
    package_info = analyze_package_json(os.path.join(project_dir, 'package.json'))
    if package_info:
        summary.append("## Información del Proyecto (`package.json`)\n")
        summary.append(f"- **Nombre:** {package_info['name']}")
        summary.append(f"- **Versión:** {package_info['version']}\n")
        
        if package_info['scripts']:
            summary.append("### Scripts disponibles:\n")
            for script, cmd in package_info['scripts'].items():
                summary.append(f"- `{script}`: `{cmd}`")
            summary.append("")
        
        if package_info['dependencies']:
            summary.append("### Dependencias clave:\n")
            for dep, ver in sorted(package_info['dependencies'].items()):
                summary.append(f"- `{dep}`: `{ver}`")
            summary.append("")
            
        if package_info['devDependencies']:
            summary.append("### Dependencias de desarrollo:\n")
            for dep, ver in sorted(package_info['devDependencies'].items()):
                summary.append(f"- `{dep}`: `{ver}`")
            summary.append("")
        
    summary.append("## Estructura de Directorios (Hasta nivel 3)\n")
    summary.append("```text")
    summary.append(get_directory_tree(project_dir))
    summary.append("```\n")
    
    return "\n".join(summary)

if __name__ == '__main__':
    print(generate_summary())
