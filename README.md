# Sumologic Logger
[![Build Status](https://travis-ci.org/Reekoh/sumologic-logger.svg)](https://travis-ci.org/Reekoh/sumologic-logger)
![Dependencies](https://img.shields.io/david/Reekoh/sumologic-logger.svg)
![Dependencies](https://img.shields.io/david/dev/Reekoh/sumologic-logger.svg)
![Built With](https://img.shields.io/badge/built%20with-gulp-red.svg)

Sumologic Logger Plugin for the Reekoh IoT Platform. Integrates a Reekoh Instance with Sumologic to synchronize topology log data.

## Description
This plugin saves all log data from the Reekoh Instance for easier access to the application's logs.

## Configuration
To configure this plugin a Sumologic account and collector is needed in order to provide an HTTP Source(a URL pointing to a specific Sumologic collector).
This HTTP Source is then injected to the plugin from the platform.