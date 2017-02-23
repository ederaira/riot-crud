<!-- json-forms https://github.com/brutusin/json-forms -->
<crud-json-forms>

    <link href="/bower_components/json-forms/dist/css/brutusin-json-forms.min.css" rel="stylesheet">

    <div class="card">
        <div class="header">
            <h2>{opts.title} <span if={data}>{data._id}</span><small>{opts.description}</small></h2>
            <crud-header-dropdown if={opts.actionMenu !== false} service="{opts.service}" name="{opts.name}" views="{opts.views}" view="{opts.view}" query="{opts.query}" buttons="{opts.buttons}"></crud-header-dropdown>
        </div>
        <div class="body">
            <div id="json-forms{opts.service}"></div>
        </div>
    </div>

    <script>
        var self = this;

        self.mixin('FeatherClientMixin');

        self.dependencies = [
                '/bower_components/json-forms/dist/js/brutusin-json-forms.min.js',
                '/bower_components/json-forms/dist/js/brutusin-json-forms-bootstrap.min.js'
        ];

        // this can move into serviceMixins
        // this.refresh = (opts) => {
        //     self.opts = opts;
        //     self.update();
        //     if(self.opts.query.id) {
        //         self.get(self.opts.query.id);
        //     }
        // },
        self.on('mount', function (){
        })

        self.on('update', function (){

            $('#json-forms'+self.opts.service).html('');
            self.initPlugins();
        })

        self.initView = () => {

            if(self.editor) {
                self.update();
            } else {
                self.initPlugins();
            }
        }

        self.initPlugins = function() {
            console.log('self.opts.schema',self.opts.schema)
            var schemaNO = new Object({
                              "$schema": "http://json-schema.org/draft-04/schema#",
                              "type": "object",
                              "title": "Product",
                              "properties": {
                                "_id": {
                                  "type": "string",
                                  "readonly": true
                                },
                                "active": {
                                  "type": "boolean"
                                },
                                "sku": {
                                  "type": "string"
                                },
                                "name": {
                                  "type": "string"
                                },
                                "url": {
                                  "type": "string"
                                },
                                "price_euro": {
                                  "type": "number"
                                },
                                "price_dollar": {
                                  "type": "number"
                                },
                                "image": {
                                  "type": "string"
                                },
                               "images": {
                                  "type": "array",
                                  "format": "table",
                                  "title": "Images",
                                  "uniqueItems": true,
                                  "items": {
                                    "type": "object",
                                    "title": "Image",
                                    "properties": {
                                      "href": {
                                        "type": "string",
                                        "format": "image"
                                      },
                                      "title": {
                                        "type": "string"
                                      },
                                      "description": {
                                        "type": "string",
                                        "options": {
                                            "wysiwyg": true
                                        }
                                      },
                                      "mediaType": {
                                        "type": "string",
                                        "enum": [
                                          "jpg",
                                          "png",
                                          "git"
                                        ]
                                      }
                                    }
                                  }
                                },
                                 "locales": {
                                  "type": "array",
                                  "format": "table",
                                  "title": "locales",
                                  "uniqueItems": true,
                                  "items": {
                                    "type": "object",
                                    "title": "Locale",
                                    "properties": {
                                      "lang": {
                                        "type": "string",
                                        "enum": [
                                          "DE",
                                          "EN",
                                          "FR",
                                          "ES",
                                          "IT"
                                        ]
                                      },
                                      "title": {
                                        "type": "string"
                                      },
                                      "description": {
                                        "type": "string",
                                        "format": "html",
                                        "options": {
                                            "wysiwyg": true
                                        }
                                      }
                                    }
                                  }
                                },
                                "attributes": {
                                  "type": "object",
                                  "format": "table",
                                  "title": "Attributes",
                                  "uniqueItems": true,
                                  "items": {
                                    "type": "object",
                                    "title": "Pet",
                                    "properties": {
                                      "color": {
                                        "type": "string",
                                        "enum": [
                                          "red",
                                          "blue",
                                          "bird",
                                          "reptile",
                                          "other"
                                        ],
                                        "format": "color"
                                      },
                                      "material": {
                                        "type": "string"
                                      },
                                      "adjective": {
                                        "type": "string"
                                      }
                                    }
                                  }
                                },
                                "base_color": {
                                 "type": "string",
                                  "format": "color",
                                  "title": "favorite color",
                                  "default": "#ffa500"
                                },
                                "category": {
                                  "type": "string",
                                  "format": "html",
                                      "options": {
                                      "wysiwyg": true
                                  }
                                },
                               "createdAt": {
                                  "type": "string",
                                  "format": "date"
                                },
                                "updatedAt": {
                                  "type": "string",
                                  "format": "date"
                                }
                              },
                              "required": [
                                "_id",
                                "sku",
                                "active",
                                "name",
                                "price_euro",
                                "price_dollar",
                                "base_color"
                              ],
                              "defaultProperties": [
                                "_id",
                                "sku",
                                "active",
                                "name",
                                "price_euro",
                                "price_dollar",
                                "base_color"
                              ]
                            })

            var schema = self.opts.schema;
            Object.keys(schema.properties).map(function(objectKey, index) {
                if(schema.required && schema.required.indexOf(objectKey) !== -1) {
                    if(schema.properties[objectKey].type != 'boolean')
                        schema.properties[objectKey].required = true;
                }
            });

            var BrutusinForms = brutusin["json-forms"];
            self.editor = BrutusinForms.create(schema);

            var container = document.getElementById('json-forms'+self.opts.service);
            self.editor.render(container, self.data);
        }

        self.getData = () => {
            var validation = self.editor.validate();
            if(validation) {
                self.data = self.editor.getData();
                return self.editor.getData();
            } else {
                console.log(self.editor.getData(),validation);
                return false;
            }

        }


    </script>

</crud-json-forms>

