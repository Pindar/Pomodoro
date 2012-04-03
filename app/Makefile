test:
	r.js -o app.build.js appDir= dir= optimize=none out=main-built.js
#	mocha --require mocha --require amdefine --require should --require sinon --reporter list

all:
	r.js -o app.build.js

clean:
	rm -r ../release

.PHONY: test