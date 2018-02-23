#!/usr/bin/expect -f
  set port 80
  set user root
  set host 47.100.101.97
  set password 13524653020yANg
  set timeout -1

  spawn ssh $user@$host
  expect "*assword:*"
  send "$password\r"
  interact
  expect eof  
