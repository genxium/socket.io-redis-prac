This repository for internal training use only.


# Issue installation with `pm2 install` under Windows10
```
# For cmd. Mind that the spacing below is strict.
user.cmd@proj-root> set HOME=%USERPROFILE%
user.cmd@proj-root> pm2 install pm2-logrotate
```

```
# For powershell.
user.powershell@proj-root> $env:HOME = $env:USERPROFILE
user.powershell@proj-root> pm2 install pm2-logrotate
```

#References
- https://github.com/genxium/pm2-cluster-mode-logging-prac.
- https://github.com/genxium/nodejs-cluster-prac, for comparison.
