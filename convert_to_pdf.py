import sys
import os

try:
    import win32com.client
    def convert_to_pdf(docx_path, pdf_path):
        word = win32com.client.Dispatch('Word.Application')
        word.Visible = False
        doc = word.Documents.Open(docx_path)
        doc.SaveAs(pdf_path, FileFormat=17)
        doc.Close()
        word.Quit()
        print(f"Converted {docx_path} to {pdf_path}")
    
    # Use absolute paths
    folder = os.path.abspath(r"d:\APP\portfolio\salman-portfolio-final\salman-portfolio-v2\books")
    
    for file in os.listdir(folder):
        if file.endswith(".docx") and not file.startswith('~'):
            docx = os.path.join(folder, file)
            pdf = os.path.join(folder, file.replace(".docx", ".pdf"))
            # Only convert if PDF doesn't exist
            if not os.path.exists(pdf):
                convert_to_pdf(docx, pdf)
            else:
                print(f"PDF already exists for {file}")

except ImportError:
    print("Error: pywin32 module is not installed. Run 'pip install pywin32' first.")
except Exception as e:
    print("Error:", e)
