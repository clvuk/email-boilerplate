# Email boilerplate

A simple boilerplate project for modern HTML email development.

Includes a Gulp buildstep that inlines CSS, compiles [Inky][inky] templates, serves a demo (via [BrowserSync][browsersync]), and sends test emails (via [Mailgun][mailgun]).

### Installation and usage

Clone this repo and remove the `.git` directory to start your own HTML email from scratch

```sh
git clone https://github.com/seaneking/email-boilerplate.git email-boilerplate

cd email-boilerplate && rm -r .git
```

The source of your email lives in `/src` and builds to the root of your project. Run `gulp build` to compile your email, or `gulp build --debug` to skip minification for debugging purposes.

You can use the Inky templating language to easily construct the tables needed for email layout - read more in the [Inky docs][inky-docs].

```html
<container>
  <row>
    <columns>My email content here</columns>
  </row>
</container>
```

### Serving

You can serve your email for basic browser testing by running `gulp serve` and navigating to `localhost:3000`. Alternatively just run the default `gulp` task, which will build, serve, and watch your codebase for changes.

### Testing

You can send emails to yourself for testing with the `gulp test` task. Sign up for a free [Mailgun][mailgun] account, and put your API key in a file called `.mailgun.json`. See the `.mailgun.example.json` file for reference.
```json
{
    "api": "your-mailgun-api-key"
}
```

Then run `gulp test` with the email you want to send the test to.

```sh
gulp test --email me@email.com
```

***


MIT © [Sean King](https://github.com/seaneking)

[inky]: http://foundation.zurb.com/emails/docs/inky.html
[inky-docs]: http://foundation.zurb.com/emails/docs/grid.html
[browsersync]: browsersync.io
[mailgun]: https://www.mailgun.com/
[dotenv]: https://github.com/bkeepers/dotenv
