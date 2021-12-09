import os;

ALLOWED_HOSTS = ['https://clocean-backend.herokuapp.com/',
                'http://clocean-backend.herokuapp.com/',
                'clocean-backend.herokuapp.com/',
                'clocean-backend.herokuapp.com']

CORS_ORIGIN_ALLOW_ALL = True

DEBUG = os.environ.get('DJANGO_DEBUG', '') != 'False'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


CORS_REPLACE_HTTPS_REFERER      = True
HOST_SCHEME                     = "https://"
SECURE_PROXY_SSL_HEADER         = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT             = True
SESSION_COOKIE_SECURE           = True
CSRF_COOKIE_SECURE              = True
SECURE_HSTS_INCLUDE_SUBDOMAINS  = True
SECURE_HSTS_SECONDS             = 1000000
SECURE_FRAME_DENY               = True


STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'