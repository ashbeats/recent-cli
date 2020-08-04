
@echo off


rem ____
rem Once you select a recent folder, I'll use PUSHD to change the cwd. 
rem You can then, run popd anytime to come back to this folder.


node "%~dp0/recent.js" %*

if not exist %~dp0/../../.LAST_FOLDER GOTO closing_time 

REM get the first entry from last folder and pushd

for /f "delims=" %%i in (%~dp0/../../.LAST_FOLDER) do (
  pushd %%i
)

:closing_time 

