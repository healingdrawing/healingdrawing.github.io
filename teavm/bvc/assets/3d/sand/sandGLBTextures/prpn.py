import os
import sys
import shutil
# from PIL import Image

if getattr(sys, 'frozen', False):
  mydir = os.path.dirname(sys.executable)
elif __file__:
  mydir = os.path.dirname(os.path.abspath(__file__))

print("------------mydir------------")
print(mydir)
print("------------------------")

usedExt = input("how much times repeat the file? 10 => 0..9 suffixes. \n"
+"file name for repeating with extension, f.e. \"text\" or \"text.txt\" .\n"
+"Comma is separator.\nExample: \"10,text.txt\" , then press Enter\n")
try:
  usedExt = usedExt.split(",")
  if(len(usedExt) != 2):
    usedExt = False
  else:
    n,e =False, False
    ne = usedExt[1].split(".")
  if len(ne)==2:
    n,e=ne
  elif len(ne)>2:
    e = ne[-1]
    n = ".".join(ne[:-1])
  else:
    n=ne
    e = ""
  usedExt = [int(usedExt[0]),usedExt[1],n,e]
except:
  print("bad incoming")
  print(sys.exc_info())

print(usedExt)

try:
  print("------------------ start ----------------------")
  
  srcFile = mydir+os.sep+usedExt[1]
  for i in range(usedExt[0]):
    dstFile = mydir+os.sep+usedExt[2]+str(i)+"."+usedExt[3]
    shutil.copy(srcFile, dstFile)
  
  print("------------------ end ----------------------")

except:
  print(sys.exc_info())
input("done / enter to close")
