# perf-monitor-cli
[![Travis build status](http://img.shields.io/travis/perf-site/perf-monitor-cli.svg?style=flat)](https://travis-ci.org/perf-site/perf-monitor-cli)
[![AppVeyor Build status](http://img.shields.io/appveyor/ci/perf-site/perf-monitor-cli.svg?style=flat)](https://ci.appveyor.com/project/perf-site/perf-monitor-cli/branch/master)
[![Code Climate](https://codeclimate.com/github/perf-site/perf-monitor-cli/badges/gpa.svg)](https://codeclimate.com/github/perf-site/perf-monitor-cli)
[![Test Coverage](https://codeclimate.com/github/perf-site/perf-monitor-cli/badges/coverage.svg)](https://codeclimate.com/github/perf-site/perf-monitor-cli)
[![Dependency Status](https://david-dm.org/perf-site/perf-monitor-cli.svg)](https://david-dm.org/perf-site/perf-monitor-cli)
[![devDependency Status](https://david-dm.org/perf-site/perf-monitor-cli/dev-status.svg)](https://david-dm.org/perf-site/perf-monitor-cli#info=devDependencies)

### Opening chrome with a fresh profile
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --enable-precise-memory-info --user-data-dir=$(mktemp -d -t chrome.XXXXXX) --no-default-browser-check --no-first-run


