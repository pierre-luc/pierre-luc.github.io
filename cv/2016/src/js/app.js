angular
    .module('resume', [])
    .directive("level", function(){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                value: '=',
                max: '=max'
            },
            template: '<div class="level">'
                    +     '<i ng-repeat="i in getNumber(value) track by $index" class="valued fa fa-circle" aria-hidden="true"></i>'
                    +     '<i ng-repeat="i in getNumber(max - value) track by $index" class="fa fa-circle" aria-hidden="true"></i>'
                    + '</div>'
            ,
            controller: function($scope){
                $scope.getNumber = function(num) {
                    return new Array(num);
                }
            }
        }
    })
    .controller('resume', function($scope){
        $scope.techIcon = function(name){
            var techs = {
                "php": "devicon-php-plain",
                "java": "devicon-java-plain",
                "javascript": "devicon-javascript-plain",
                "symfony": "devicon-symfony-original",
                "symfony 2.8": "devicon-symfony-original",
                "redis": "devicon-redis-plain",
                "mysql": "devicon-mysql-plain",
                "postgres": "devicon-postgresql-plain",
                "html": "devicon-html5-plain",
                "css": "devicon-css3-plain",
                "sass": "devicon-sass-original",
                "bootstrap": "devicon-bootstrap-plain",
                "apache": "devicon-apache-plain",
                "nodejs": "devicon-nodejs-plain",
                "nginx": "devicon-nginx-original",
                "angularjs": "devicon-angularjs-plain",
                "illustrator": "devicon-illustrator-plain",
                "gulp": "devicon-gulp-plain",
                "gimp": "devicon-gimp-plain",
                "inkscape": "devicon-inkscape-plain",
                "photoshop": "devicon-photoshop-plain",
                "jetbrain": "devicon-jetbrains-plain",
                "atom": "devicon-atom-original",
                "foundation": "devicon-foundation-plain",
                "asterisk": "fa fa-asterisk",
                "jquery": "devicon-jquery-plain",
                "wordpress": "devicon-wordpress-plain"
            };
            
            return {
                name: name,
                icon: techs[name.toLowerCase()] ? techs[name.toLowerCase()] : null 
            }
        }
        $scope.data = {
            firstname: "Pierre-Luc",
            name: "BLOT",
            job: "Développeur full stack",
            phone: "01 23 45 67 89",
            email: "pierreluc.blot@gmail.com",
            home: "144 rue des pétales, 75000 Rouen",
            birthday: "23/10/1990",
            github: "pierre-luc",

            experiences: [
                {
                    date: "Juillet 2016 - Aujourd'hui",
                    title: "Plateforme de création de sites",
                    description: "Création d’une plateforme de création et déploiement de sites",
                    techs: ["Symfony 2.8", "NodeJS", "AngularJS"]
                }, {
                    date: "Mai 2015 - Aujourd'hui",
                    title: "Plateforme de centre d'appels",
                    description: "Création d'une plateforme de centre d'appels en freelance",
                    techs: ["Symfony 2.8", "NodeJS", "AngularJS", "Asterisk", "Redis"]
                }, {
                    date: "Novembre 2015",
                    title: "Système de paiement",
                    description: "Intégration système de paiement au sein d’un site existant",
                    techs: ["Paypal Express Checkout", "Paysafecard", "Payplug"]
                }, {
                    date: "Octobre 2015",
                    title: "Site de mode",
                    description: "Participation au développement d’un site internet pour des stylistes affiliés à Jean-Paul Gaultier",
                    techs: ["jQuery", "Wordpress"],
                    url: "http://own.be"
                }, {
                    date: "Avril 2014",
                    title: "Site pour compositeur de musique de film",
                    description: "Création du site offciel de Raphaël Bellamy, compositeur de musique de film et à l’image",
                    techs: ["jQuery", "Wordpress"],
                    url: "http://raphaelbellamy.com"
                }
            ],
            education: [
                {
                    date: "2016/2017",
                    title: "Master 2 Génie de l’informatique logicielle UFR Sciences et techniques, Saint-Etienne du Rouvray"
                }, {
                    date: "2014/2015",
                    title: "Master 1 Génie de l’informatique logicielle UFR Sciences et techniques, Saint-Etienne du Rouvray"
                }, {
                    date: "2013/2014",
                    title: "Licence informatique UFR Sciences et techniques, Saint-Etienne du Rouvray"
                }
            ],

            skills: [
                {
                    title: "IT Sciences",
                    skills: [
                        {
                            title: "Langages de progammation",
                            level: 7,
                            opts: ["php", "Java", "C", "javascript", "html", "css", "sass"]
                        }, {
                            title: "Serveurs web",
                            level: 6,
                            opts: ["Apache", "NGinx", "NodeJS"]
                        }, {
                            title: "Connaissance des frameworks",
                            level: 7,
                            opts: ["Symfony", "AngularJS", "Spring", "Bootstrap", "Foundation"]
                        }, {
                            title: "Bases de données",
                            level: 6,
                            opts: ["MySQL", "Redis", "Postgres"]
                        }, {
                            title: "Analyse",
                            level: 5,
                            opts: ["UML"]
                        }, {
                            title: "Apprentissage de nouveaux langages",
                            level: 7
                        }, {
                            title: "Outils / Infographie / IDE",
                            level: 8,
                            opts: ["gulp", "photoshop", "gimp", "inkscape", "illustrator", 'jetbrain', 'atom' ]
                        }
                    ]
                }, {
                    title: "Linguistique",
                    skills: [
                        {
                            title: "Anglais technique lu",
                            level: 7
                        }, {
                            title: "Anglais technique parlé",
                            level: 5
                        }
                    ]
                }
            ],

            hobbies: [
                {
                    name: "Cinéma",
                    icon: "fa fa-film"
                }, {
                    name: "Technologies",
                    icon: "fa fa-desktop"
                }, {
                    name: "Développement web",
                    icon: "fa fa-mobile"
                }, {
                    name: "Musique",
                    icon: "fa fa-music"
                }, {
                    name: "Apprendre",
                    icon: "fa fa-book"
                }
            ]
        }
    });