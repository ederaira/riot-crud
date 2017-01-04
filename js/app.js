var riotCrudTheme =
        location.search == '?theme=zurb' ?
        '/js/riotcrud/themes/zurb' :
        '/js/riotcrud/themes/bootstrap';

var dependencyList = {
    layout: [riotCrudTheme + '/menu.js', riotCrudTheme + '/views/crud-views.js'],
    login: riotCrudTheme + '/login.js',register: riotCrudTheme + '/register.js'
};

$script(dependencyList.layout, 'layout');

$script.ready('layout', function() {

    // var riotCrudTheme = '/js/riotcrud/themes/bootstrap'; //'/js/riotcrud/themes/zurb';


    // var dependencyList = {
    //     layout: [riotCrudTheme + '/menu.js', riotCrudTheme + '/dashboard.js', riotCrudTheme + '/views/crud-views.js'],
    //     dashboard: riotCrudTheme + '/login.js',register: riotCrudTheme + '/register.js'
    // };

    // var onLoadDependencies = [];

    // /*router util*/
    // $.each(dependencyList.layout,function(index, script) {
    //     onLoadDependencies.push(
    //         $.ajax({
    //           url: script,
    //           dataType: "script",
    //           cache: false,
    //           success: function(){console.info(script)}
    //         })
    //     );
    // });

    // /*router util*/
    // $.when(onLoadDependencies)
    //     .done(function(first_call, second_call, third_call){
    //         //do something
    //         console.info('dep');
    //     })
    //     .fail(function(){
    //         //handle errors
    //         console.error('dep?');
    //     });


    console.info('script ready');
    /**
     * Riot controller
     * define custom routes
     */
    RiotCrudController.defaults({
        target: '#content'
    });

    RiotCrudController.addRoute('dashboard',
        {
            title: 'Dashboard',
            menu: true,
            route: '/dashboard',
            dependencies: [riotCrudTheme + '/dashboard.js'],
            fn: function(id, action) {
                riot.mount('#content', 'dashboard');
            }
        }
    );

    RiotCrudController.addRoute('order',
        {
            title: 'Order <small>(custom view)</small>',
            menu: true,
            route: '/orders/view/1',
            dependencies: [riotCrudTheme + '/order.js'],
            fn: function(id, action) {
                riot.mount('#content', 'order');
            }
        }
    );

    RiotCrudController.addRoute('table-demo',{title: 'Table',menu: true, route: '/products/list'});
    RiotCrudController.addRoute('table-view',{title: 'Show',menu: true, route:'/products/view/1'});
    RiotCrudController.addRoute('table-edit',{title: 'Edit',menu: true, route:'/products/edit/1'});
    RiotCrudController.addRoute('table-create',{title: 'Create',menu: true, route:'/products/create/1'});

    /**
     * Riot crud model
     * define your models
     */
    RiotCrudModel.defaults({
        baseUrl: 'http://localhost:3030',
        target: 'div#content',
        requestFn: function(collection, view, id, params) {},
        responseFn: function(collection, view, id, params, response) {}
    });

    RiotCrudModel.addModel('products',
        {
            keyField: '_id',
            service: 'products',
            title: 'Products',
            description: '/products/list',
            menu: true,
            schema: 'http://localhost:3030/schema/product.json', // string || object ?? || array [{list:'list-tag'}] ?? default
            target: 'div#content', // optional
            endpoint: 'http://localhost:3030', //'http://localhost:3030/products', rest enpoints
            tag: 'crud-jsoneditor', // default
            // dependencies: 'product-view-plugin.js',
        },
        { // mixed object || array ['list','show','create','update','delete'] ???
            list: {
                // optional
                selection: true,
                filterable: true,
                buttons: ['edit','delete'],
                tag: 'crud-datatables', // default
                title: 'Product List',
                schema: 'http://localhost:3030/schema/product.json', // string || object ?? || array [{list:'list-tag'}] ?? default
                target: 'div#content', // optional
                // endpoint: '/api/product/list',
                columns: {
                    base_color: {
                        "data": null,
                        "render": function ( data, type, row ) {
                            return '<span class="badge badge-success" style="background-color:' + data.base_color + '">' + data.base_color + '</span>';
                        }
                    }
                },
                dependencies: [
                    riotCrudTheme + '/views/crud-datatables.js'
                ]
            },
            view:{
                tag: 'crud-jsoneditor', // default
                title: 'Product Demo',
                schema: 'http://localhost:3030/schema/product.json', // string || object ?? || array [{list:'list-tag'}] ?? default
                target: 'div#content', // optional
                // endpoint: '/api/product/view',
                dependencies: [
                    riotCrudTheme + '/views/crud-jsoneditor.js',
                ] // string || array
            },
            create: {
                // fn: function() {riot.route('/product/view')}
                tag: 'crud-jsoneditor', // default
                title: 'Edit Products (json-editor demo)',
                menu:true,
                target: 'div#content', // optional
                // fn: function() {riot.route('/products/edit/1')}
                dependencies: [
                    riotCrudTheme + '/views/crud-jsoneditor.js'
                ]
            },
            edit: {
                tag: 'crud-jsoneditor', // default
                title: 'Edit Products (json-editor demo)',
                menu:true,
                target: 'div#content', // optional
                // fn: function() {riot.route('/products/edit/1')}
                dependencies: [
                    riotCrudTheme + '/views/crud-jsoneditor.js'
                ]
            },
            delete: {}
        }
    );

    RiotCrudModel.addModel('categories',
        {
            service: 'categories',
            title: 'Categories',
            description: '/categories/list',
            menu: true,
            schema: 'http://localhost:3030/schema/category.json', // string || object ?? || array [{list:'list-tag'}] ?? default
            target: 'div#content', // optional
            endpoint: 'http://localhost:3030', //'http://localhost:3030/products', rest enpoints
            tag: 'crud-jsoneditor', // default
            // dependencies: 'product-view-plugin.js',
        },
        { // mixed object || array ['list','show','create','update','delete'] ???
            list: {
                // optional
                selection: true,
                filterable: true,
                buttons: ['edit','delete'],
                tag: 'crud-datatables', // default
                title: 'Category List',
                schema: 'http://localhost:3030/schema/category.json', // string || object ?? || array [{list:'list-tag'}] ?? default
                target: 'div#content', // optional
                // endpoint: '/api/product/list',
                columns: {
                    base_color: {
                        "data": null,
                        "render": function ( data, type, row ) {
                            return '<span class="badge badge-success" style="background-color:' + data.base_color + '">' + data.base_color + '</span>';
                        }
                    }
                },
                dependencies: [
                    riotCrudTheme + '/views/crud-datatables.js',
                    // '/bower_components/datatables.net/js/jquery.dataTables.min.js',
                    // '/bower_components/gentelella/vendors/datatables.net/js/jquery.dataTables.min.js',
                    // '/bower_components/gentelella/vendors/datatables.net-bs/js/dataTables.bootstrap.min.js',
                    // '/bower_components/gentelella/vendors/datatables.net-buttons/js/dataTables.buttons.min.js',
                    // '/bower_components/gentelella/vendors/datatables.net-buttons-bs/js/buttons.bootstrap.min.js',
                    // '/bower_components/gentelella/vendors/datatables.net-buttons/js/buttons.flash.min.js',
                    // '/bower_components/gentelella/vendors/datatables.net-buttons/js/buttons.html5.min.js',
                    // '/bower_components/gentelella/vendors/datatables.net-buttons/js/buttons.print.min.js',
                    // '/bower_components/gentelella/vendors/datatables.net-fixedheader/js/dataTables.fixedHeader.min.js',
                    // '/bower_components/gentelella/vendors/datatables.net-keytable/js/dataTables.keyTable.min.js',
                    // '/bower_components/gentelella/vendors/datatables.net-responsive/js/dataTables.responsive.min.js',
                    // '/bower_components/gentelella/vendors/datatables.net-responsive-bs/js/responsive.bootstrap.js',
                    // '/bower_components/gentelella/vendors/datatables.net-scroller/js/datatables.scroller.min.js',
                    // '/bower_components/gentelella/vendors/jszip/dist/jszip.min.js',
                    // '/bower_components/gentelella/vendors/pdfmake/build/pdfmake.min.js',
                    // '/bower_components/gentelella/vendors/pdfmake/build/vfs_fonts.js',
                ] // string || array
            },
            view:{
                tag: 'crud-jsoneditor', // default
                title: 'Category Demo',
                schema: 'http://localhost:3030/schema/product.json', // string || object ?? || array [{list:'list-tag'}] ?? default
                target: 'div#content', // optional
                // endpoint: '/api/product/view',
                dependencies: [
                    riotCrudTheme + '/views/crud-jsoneditor.js',
                    '/bower_components/json-editor/dist/jsoneditor.min.js',
                    'http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.2/summernote.js',
                    // 'http://cdn.jsdelivr.net/sceditor/1.4.3/jquery.sceditor.bbcode.min.js',
                    // 'http://cdn.jsdelivr.net/sceditor/1.4.3/jquery.sceditor.xhtml.min.js'
                ] // string || array
            },
            create: {
                // fn: function() {riot.route('/product/view')}
                tag: 'crud-jsoneditor', // default
                title: 'Edit Products (json-editor demo)',
                menu:true,
                target: 'div#content', // optional
                // fn: function() {riot.route('/products/edit/1')}
                dependencies: [
                    riotCrudTheme + '/views/crud-jsoneditor.js'
                ]
            },
            edit: {
                tag: 'crud-jsoneditor', // default
                title: 'Edit Products (json-editor demo)',
                menu:true,
                target: 'div#content', // optional
                // fn: function() {riot.route('/products/edit/1')}
                dependencies: [
                    riotCrudTheme + '/views/crud-jsoneditor.js'
                ]
            },
        }
    );



    RiotCrudModel.addModel('orders',
        {
            service: 'orders',
            title: 'Orders',
            menu: true,
            route: '/orders',
            dependencies: [riotCrudTheme + '/order.js'],
            schema: 'http://localhost:3030/schema/order.json', // string || object ?? || array [{list:'list-tag'}] ?? default
            target: 'div#content', // optional
            endpoint: 'http://localhost:3030', //'http://localhost:3030/products', rest enpoints
            tag: 'crud-jsoneditor', // default
        },
        { // mixed object || array ['list','show','create','update','delete'] ???
            list: {
                // optional
                selection: true,
                filterable: true,
                buttons: ['edit','delete'],
                tag: 'crud-datatables', // default
                title: 'Order List',
                schema: 'http://localhost:3030/schema/order.json', // string || object ?? || array [{list:'list-tag'}] ?? default
                target: 'div#content', // optional
                // endpoint: '/api/product/list',
                columns: {
                    base_color: {
                        "data": null,
                        "render": function ( data, type, row ) {
                            return '<span class="badge badge-success" style="background-color:' + data.base_color + '">' + data.base_color + '</span>';
                        }
                    }
                },
                dependencies: [
                    riotCrudTheme + '/views/crud-datatables.js',
                ] // string || array
            },
            view:{
                tag: 'order', // default
                title: 'Order <small>(custom view)</small>',
                schema: 'http://localhost:3030/schema/order.json', // string || object ?? || array [{list:'list-tag'}] ?? default
                target: 'div#content', // optional
                // endpoint: '/api/product/view',
                dependencies: [
                    riotCrudTheme + '/order.js'
                ]
            },
            create: {
                // fn: function() {riot.route('/product/view')}
                tag: 'crud-jsoneditor', // default
                title: 'Create Order (json-editor demo)',
                menu:true,
                target: 'div#content', // optional
                // fn: function() {riot.route('/products/edit/1')}
                dependencies: [
                    riotCrudTheme + '/views/crud-jsoneditor.js'
                ]
            },
            edit: {
                tag: 'crud-jsoneditor', // default
                title: 'Edit Order (json-editor demo)',
                menu:true,
                target: 'div#content', // optional
                // fn: function() {riot.route('/products/edit/1')}
                dependencies: [
                    riotCrudTheme + '/views/crud-jsoneditor.js'
                ]
            },
            delete: {}
        }
    );
    // console.info('routes: RiotCrudController.getRoutes()',RiotCrudController.getRoutes());
    // mount menu here will ignore following addRoute
    riot.mount('side-menu','side-menu', {
        routes: RiotCrudController.getRoutes()
    });

    riot.mount('top-menu','top-menu', {
        services: {
            products: ['created','create','update','updated','removed'],
            categories: ['created','create','update','updated','removed'],
            orders: ['created','create','update','updated','removed']
        }
    });

    if(window.location.hash === "" && window.location.hash != "#dashboard") {
       riot.route('dashboard');
    }

    RiotCrudController.start();

    // RiotCrudModel
    // RiotCrudRoute.start(RiotCrudModel.getRoutes())
    // RiotCrudObservebla

})

