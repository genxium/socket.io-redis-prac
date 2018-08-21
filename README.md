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

# Starts the stressing-client
```
proj-root> node test_client_ws_conn.js 
```

# References
- https://github.com/genxium/pm2-cluster-mode-logging-prac.
- https://github.com/genxium/nodejs-cluster-prac
  - For comparison, the clustering approach of this repository enables deployment across multiple servers/OSes by making use of `Redis`. 
  - However, compared with other load-balancer & reverse-proxy software, e.g. Nginx, the `master-process` of each `pm2 cluster` still uses up to only 1 duty thread and thus up to only 1 CPU core.
