import re
import os
import shutil
from pathlib import Path
from IPython.display import IFrame



def extract_cell_num(cell_content):
    cell_num = re.search(r'//cell (\d+)', cell_content, re.MULTILINE)
    if cell_num: 
        return int(cell_num[1])
    return None



def check_cell_keys(keys):
    if keys:
        key_set = set(keys)
        assert max(key_set) == len(keys), f"You have non-consecutive %%script node cells: {key_set}"

        
        
def get_js_cells_dct(locals):
    locals_dct = locals.copy()
    # print(locals_dct)
    nb_input_matches = dict()
    for key, val in locals_dct.items():
        nb_input_match = re.match(r'_i(\d+)', key)
        if nb_input_match:
            nb_input_matches[int(nb_input_match[1])] = "_i" + nb_input_match[1]

    js_cells_dct = dict()
    for input_idx, nb_input_var in sorted(nb_input_matches.items(), reverse=True):
        # Reverse read last executed cells
        cell_content = locals[nb_input_var]
        if cell_content.startswith("%%script node"):
            cell_num = extract_cell_num(cell_content)
            if cell_num is not None and not cell_num in js_cells_dct:
                js_cells_dct[cell_num] = cell_content

    try:
        check_cell_keys(js_cells_dct.keys())
    except AssertionError as e:
        os._exit(1)
    
    return js_cells_dct



def edit_main_template(js_cells_dct):
    main_template_file = Path("./src/js/main_template.js")
    main_file = Path(str(main_template_file).replace("main_template.js", "main_edited.js"))
    shutil.copy(main_template_file, main_file)

    # Read in the file
    with open(main_file, 'r') as file :
        filedata = file.read()

    all_cells_content = ""
    # Replace the target string
    for cell_num, cell_contents in js_cells_dct.items():
        all_cells_content = all_cells_content + (
            cell_contents
            .replace("%%script node", "")
            .replace("var Matter", "//var Matter")
            .replace("var engine", "//var engine")
        )

    filedata = filedata.replace("//cellcontents", all_cells_content)
    
    with open(main_file, 'w') as file:
          file.write(filedata)
            
            
            
def display_matter_js(width=300, height=300):
    return IFrame(src='http://127.0.0.1:8080/', width=width, height=height)



def update_and_display(locals, width=300, height=300):
    edit_main_template(get_js_cells_dct(locals))
    return display_matter_js(width=width, height=height)
    