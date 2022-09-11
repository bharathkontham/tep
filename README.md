# Task Executor Service

## Dependencies

* Redis

## Description

* Used BullMQ as a messaging queue for processing tasks.
* NestJS framework is used for developing this service.
* Redis is required for bullmq

## configuration

* create .env file based on .env.sample sample file in root directory

## Flow and Architecture

* TBD

## APIs

* Swagger url <http://localhost:3000/docs>

### Add Task to Queue

* Use POST http:/localhost:3000/task API to add a task to queue.
* Task requires a webhook URL which must be a POST API with json payload support
* If webhook returns 5xx errors then it will be retried for 3 times max.
* This support task scheduling with repeatable cron string or delayed execution in milliseconds.
* Payload for creating task is share below

> task with delayed execution of 10 seconds

```json
{
  "name": "test",
  "webHookURL": "https://google.com/test",
  "payload": {
    "name":"bharath"
  },
  "schedule": {
    "repeatable": false,
    "delay": 10000
  }
}
```

> repeatable task executes every day at 4:25 UTC with cron expression

```json
{
  "name": "test",
  "webHookURL": "https://google.com/test",
  "payload": {
    "name":"bharath"
  },
  "schedule": {
    "repeatable": true,
    "cron": "25 4 * * *"
  }
}
```

> Task without any schedule

```json
{
  "name": "test",
  "webHookURL": "https://google.com/test",
  "payload": {
    "name":"bharath"
  }
}
```


## How to run

```shell
npm start
```
