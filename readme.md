# Log Piper

This command line utility is used to pipe a command output to a http server. It is used to be able to display real-time logs on a web page. The server and client part can be seperated out.

Run the utility by executing

```bash
<generateLogCommand> | node logpiper.js
```


It uses the following:

 * Node.js
 * Socket IO
 * Typescript
 * Jasmine