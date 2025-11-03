#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'animeinfo_backend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        # Provide clearer, actionable guidance when Django is missing.
        this_dir = os.path.dirname(__file__)
        # Look for requirements.txt in the same directory as manage.py first, then the parent.
        candidates = [
            os.path.join(this_dir, 'requirements.txt'),
            os.path.join(this_dir, '..', 'requirements.txt'),
        ]
        req_path = None
        for c in candidates:
            c_norm = os.path.normpath(c)
            if os.path.exists(c_norm):
                req_path = c_norm
                break

        python = sys.executable or 'python'
        suggest_req_cmd = f'"{python}" -m pip install -r "{req_path}"' if req_path else None

        help_lines = [
            "Couldn't import Django. Are you sure it's installed and available on your PYTHONPATH?",
            "Did you forget to activate a virtual environment?",
            "",
            "Suggested actions:",
            f"  1) Install Django with pip:",
            f"     {python} -m pip install Django",
            "  2) If your project has a requirements.txt, install it:",
        ]
        if suggest_req_cmd:
            help_lines.append(f"     {suggest_req_cmd}")
        else:
            help_lines.append(f"     {python} -m pip install -r requirements.txt  # if you have one")

        help_lines += [
            "  3) To create and use a virtual environment (Windows):",
            f"     {python} -m venv venv",
            r"     venv\\Scripts\\activate",
            "     pip install -r requirements.txt",
            "",
            "Example (Windows PowerShell / CMD):",
            f"  {python} -m venv .venv && .venv\\Scripts\\activate && {python} -m pip install -r requirements.txt",
            "",
            "Python executable being used:",
            f"  {python}",
            "",
            "Original import error:",
            f"  {exc}"
        ]

        # Write helpful message to stderr and exit to avoid printing a full traceback.
        message = "\n".join(help_lines)
        sys.stderr.write(message + "\n")
        sys.exit(1)
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
