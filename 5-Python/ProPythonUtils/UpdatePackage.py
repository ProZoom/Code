#!/usr/bin/env python3

import pip
from subprocess import call

print("\n-----------------list packages------------------------\n")
for dist in pip.get_installed_distributions():
    print(dist.project_name+"\n")

print("\n-----------------update packages------------------------\n")
for dist in pip.get_installed_distributions():
    call("pip3 install --upgrade " + dist.project_name, shell=True)