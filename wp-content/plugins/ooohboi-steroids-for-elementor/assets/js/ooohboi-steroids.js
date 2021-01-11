/* Elementor hooks - editor - frontend */

'use strict';

( function ( $, w ) {
    
    var $window = $( w );

    $window.on( 'elementor/frontend/init', function() {

        var PoopArtPerspektiveHA = elementorModules.frontend.handlers.Base.extend( {

            onInit: function() {

                elementorModules.frontend.handlers.Base.prototype.onInit.apply( this, arguments );
                this.initPoopArtPerspektiveHA(); 
                this.initHoverAnimator();

            }, 

            initPoopArtPerspektiveHA: function() {

                if( this.isEdit ) {
                    this.$element.addClass( 'ob-has-background-overlay' ); // PoopArt
                    // Perspektive
                    if( 'yes' === this.getElementSettings( '_ob_perspektive_use' ) ) {
                        this.$element.addClass( 'ob-use-perspektive' );
                    }
                }

            }, 
            /* HoverAnimator */ 
            initHoverAnimator: function() {
                this.routeHoverAnimator();
            }, 

            onElementChange: function( changedProp ) {
                /* Perspektive */
                if( changedProp === '_ob_perspektive_use' ) {
                    if( 'yes' === this.getElementSettings( '_ob_perspektive_use' ) ) this.$element.addClass( 'ob-use-perspektive' );
                    else this.$element.removeClass( 'ob-use-perspektive' );
                }
                /* Hoveranimator */
                if( changedProp === '_ob_allow_hoveranimator' ) { 
                    this.routeHoverAnimator();
                }
                if( [ '_ob_hoveranimator_opacity_hover', '_ob_hoveranimator_y_hover', '_ob_hoveranimator_x_hover', '_ob_hoveranimator_rot_hover', '_ob_hoveranimator_scalex_hover', '_ob_hoveranimator_scaley_hover', '_ob_hoveranimator_blur_hover' ].indexOf( changedProp ) !== -1 
                && this.isHoverAnimator() ) {
                    this.doHoverAnimator();
                }
                //-----------------

            }, 

            /* Perspektive */
            isPerspektive: function() {
                return this.$element.hasClass( 'ob-use-perspektive' );
            },
            /* HoverAnimator */ 
            isHoverAnimator: function() {
                return this.$element.hasClass( 'ob-is-hoveranimal' );
            },
            /* HoverAnimator */ 
            routeHoverAnimator: function() {
                
                if( this.isEdit ) {

                    if( ! this.isHoverAnimator() && 'yes' === this.getElementSettings( '_ob_allow_hoveranimator' ) ) {
                        this.$element.addClass( 'ob-is-hoveranimal' );
                        this.doHoverAnimator(); // initialize hover event for Hoveranimator
                    } 
                    if( this.isHoverAnimator() && 'yes' !== this.getElementSettings( '_ob_allow_hoveranimator' ) ) {
                        this.$element.removeClass( 'ob-is-hoveranimal' );
                        this.stopHoverAnimator(); // stop hover event for Hoveranimator
                    }
                } else if( ! this.isEdit && this.isHoverAnimator() ) {
                    this.doHoverAnimator(); // init front-end
                }

            },
            doHoverAnimator: function() {

                var myself = this.$element;
                var parent_column = myself.parent().closest( '.ob-is-hoveranimator' );
                if( parent_column.length ) {
                    var col_id  = parent_column.data( 'id' );
                    var opacity, pos_y, pos_x, rot, scale_y, scale_x, blur, el_settingz;
                    if( this.isEdit ) {
                        opacity = this.getElementSettings( '_ob_hoveranimator_opacity_hover' ); 
                        pos_y   = this.getElementSettings( '_ob_hoveranimator_y_hover' );
                        pos_x   = this.getElementSettings( '_ob_hoveranimator_x_hover' );
                        rot     = this.getElementSettings( '_ob_hoveranimator_rot_hover' );
                        scale_x = this.getElementSettings( '_ob_hoveranimator_scalex_hover' );
                        scale_y = this.getElementSettings( '_ob_hoveranimator_scaley_hover' );
                        blur    = this.getElementSettings( '_ob_hoveranimator_blur_hover' );
                    } else if( ! this.isEdit ) {
                        el_settingz = $.parseJSON( myself.attr( 'data-settings' ) ); // get from JSON
                        opacity = el_settingz._ob_hoveranimator_opacity_hover; 
                        pos_y   = el_settingz._ob_hoveranimator_y_hover;
                        pos_x   = el_settingz._ob_hoveranimator_x_hover;
                        rot     = el_settingz._ob_hoveranimator_rot_hover;
                        scale_x = el_settingz._ob_hoveranimator_scalex_hover;
                        scale_y = el_settingz._ob_hoveranimator_scaley_hover;
                        blur    = el_settingz._ob_hoveranimator_blur_hover;    
                    }

                    var hover_css = { 
                        'opacity': opacity.size, 
                        'top': pos_y.size + pos_y.unit, 
                        'left': pos_x.size + pos_x.unit, 
                        'transform': 'rotate(' + rot.size + 'deg) scaleX(' + scale_x.size + ') scaleY(' + scale_y.size + ')', 
                        'filter': 'blur(' + blur.size + blur.unit + ')'
                    };
                    parent_column.on( 'mouseenter.' + col_id, function() {
                        myself.css( hover_css );
                    } );
                    parent_column.on( 'mouseleave.' + col_id, function() {
                        myself.removeAttr( 'style' );
                    } );
                }

            }, 
            stopHoverAnimator: function() {

                var myself = this.$element;
                var parent_column = this.$element.parent().closest( '.ob-is-hoveranimator' );
                if( parent_column.length ) {
                    var col_id  = parent_column.data( 'id' );
                    var hover_css_reset = { 
                        'opacity': '', 
                        'top': '', 
                        'left': '', 
                        'transform': '', 
                        'filter': ''
                    };
                    parent_column.on( 'mouseenter.' + col_id, function() {
                        myself.css( hover_css_reset );
                    } );
                    parent_column.on( 'mouseleave.' + col_id, function() {
                        myself.removeAttr( 'style' );
                    } );
                }

            }, 

        } );

        var Harakiri = elementorModules.frontend.handlers.Base.extend( {

            onInit: function onInit() {

                elementorModules.frontend.handlers.Base.prototype.onInit.apply( this, arguments );
                this.initHarakiri();

            },

            initHarakiri: function() {

                if( this.isEdit ) {
                    if( 'inherit' !== this.getElementSettings( '_ob_harakiri_writing_mode' ) ) this.$element.addClass( 'ob-harakiri' );
                }

            }, 

            onElementChange: function( changedProp ) {

                if( changedProp === '_ob_harakiri_writing_mode' ) {
                    if( 'inherit' !== this.getElementSettings( '_ob_harakiri_writing_mode' ) ) this.$element.addClass( 'ob-harakiri' );
                    else this.$element.removeClass( 'ob-harakiri' );
                }

            }

        } );
        
        var SectionExtends = elementorModules.frontend.handlers.Base.extend( {

            onInit: function onInit() {

                elementorModules.frontend.handlers.Base.prototype.onInit.apply( this, arguments );
                this.initSectionExtends();

            },
            isBreakingBad: function() {

                return this.$element.hasClass( 'ob-is-breaking-bad' );

            },
            isGlider: function() {

                return this.$element.hasClass( 'ob-is-glider' );

            },
            /* needed for Inner Section stickyness */
            isInnerSection: function() {
                return this.$element.hasClass( 'elementor-inner-section' );
            }, 
            onElementChange: function( changedProp ) {

                // Breaking Bad
                if( changedProp === '_ob_bbad_use_it' ) {
                    if( 'yes' === this.getElementSettings( '_ob_bbad_use_it' ) ) this.$element.addClass( 'ob-is-breaking-bad' );
                    else this.$element.removeClass( 'ob-is-breaking-bad' );
                }
                // Glider
                if( changedProp === '_ob_glider_is_slider' ) {

                    if( 'yes' === this.getElementSettings( '_ob_glider_is_slider' ) ) {
                        this.$element.addClass( 'ob-is-glider' );
                        this.addClassesRouteGlider( '.elementor-element-' + this.$element.attr( 'data-id' ), 'addClass' ); 
                        this.initSwiperElements();
                    } else {
                        if( 'yes' != this.getElementSettings( '_ob_glider_is_slider' ) ) {
                            this.$element.removeClass( 'ob-is-glider' );
                            this.addClassesRouteGlider( '.elementor-element-' + this.$element.attr( 'data-id' ), 'removeClass' );
                        }
                    }

                }
                // Inner Section
                if( changedProp === '_ob_bbad_sssic_use' && this.isInnerSection() ) {
                    if( 'yes' === this.getElementSettings( '_ob_bbad_sssic_use' ) ) this.$element.addClass( 'ob-is-sticky-inner-section' );
                    else this.$element.removeClass( 'ob-is-sticky-inner-section' );
                }
                
            },
            addClassesRouteGlider: function( el, action ) {
                
                // elementor-container add swiper-container
                var container = $( el ).children( '.elementor-container' ).first();
                if( container.length ) container.addClass( 'swiper-container' );
                // wrapper
                var wrapper = $( container ).children( '.elementor-row' ).first();

                if( wrapper.length && 'addClass' == action ) {
                    wrapper.addClass( 'swiper-wrapper' ); 
                    $( wrapper ).children( 'div.elementor-column' ).addClass( 'swiper-slide' );
                } else {
                    // elementor 3.0+ ditched .elementor-row, we have to add the wrapper!
                    $( container ).children( 'div.elementor-column' ).wrapAll( '<div class="swiper-wrapper" />' );
                    $( container ).children( '.swiper-wrapper' ).first().children( 'div.elementor-column' ).addClass( 'swiper-slide' );
                }
                if( wrapper.length && 'removeClass' == action ) {
                    wrapper.removeClass( 'swiper-wrapper' ); 
                    $( wrapper ).children( 'div.elementor-column' ).removeClass( 'swiper-slide' );
                } else {
                    // elementor 3.0+ patch
                    $( container ).children( 'div.elementor-column' ).unwrap();
                    $( container ).children( 'div.elementor-column' ).removeClass( 'swiper-slide' );
                }

            }, 
            initSectionExtends: function() {
            
                if( this.isEdit ) {
                    // Breaking Bad
                    if( 'yes' === this.getElementSettings( '_ob_bbad_use_it' ) && ! this.isBreakingBad() ) this.$element.addClass( 'ob-is-breaking-bad' );
                    // Glider: editor and font-end
                    if( 'yes' === this.getElementSettings( '_ob_glider_is_slider' ) ) {
                        this.$element.addClass( 'ob-is-glider' );
                        this.addClassesRouteGlider( '.elementor-element-' + this.$element.attr( 'data-id' ), 'addClass' );
                        this.initSwiperElements();
                    }
                } else {
                    // Glider
                    if( 'yes' === this.getElementSettings( '_ob_glider_is_slider' ) ) {
                        this.$element.addClass( 'ob-is-glider' );
                        this.addClassesRouteGlider( '.elementor-element-' + this.$element.attr( 'data-id' ), 'addClass' ); 
                        this.initSwiperElements();
                    }
                }
                // Sticky Inner Section - identical for both front-and-back-end
                if( 'yes' === this.getElementSettings( '_ob_bbad_sssic_use' ) && this.isInnerSection() ) {
                    if( this.isEdit ) this.$element.addClass( 'ob-is-sticky-inner-section' );
                    // find first wrapping element; must match some class name(s)
                    var parent_wrapper = this.$element.closest( '.elementor-widget-wrap' );
                    if( parent_wrapper.length ) parent_wrapper.addClass( 'ob-sssic-wrapper' );
                }
            }, 
            initSwiperElements: function() {
                // navig
                if( ! this.$element.children( '.elementor-container .swiper-button-next' ).first().length ) {
                    this.$element.children( '.elementor-container' ).first().append( 
                        '<div class="swiper-button-next"><svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin" viewBox="0 0 27 44"><path d="M27 22L5 44l-2.1-2.1L22.8 22 2.9 2.1 5 0l22 22z"></path></svg></div>' 
                    );
                }
                if( ! this.$element.children( '.elementor-container .swiper-button-prev' ).first().length ) {
                    this.$element.children( '.elementor-container' ).first().append( 
                        '<div class="swiper-button-prev"><svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin" viewBox="0 0 27 44"><path d="M0 22L22 0l2.1 2.1L4.2 22l19.9 19.9L22 44 0 22z"></path></svg></div>' 
                    );
                }
                // pagination
                if( ! this.$element.children( '.elementor-container .swiper-pagination' ).first().length ) {
                    this.$element.children( '.elementor-container' ).first().append( '<div class="swiper-pagination"></div>' );
                }
                // settings 
                var settingz = {};
                settingz.pagination_type = this.getElementSettings( '_ob_glider_pagination_type' );
                settingz.allowTouchMove = this.getElementSettings( '_ob_glider_allow_touch_move' );
                settingz.autoheight = this.getElementSettings( '_ob_glider_auto_h' );
                settingz.effect = this.getElementSettings( '_ob_glider_effect' );
                settingz.loop = this.getElementSettings( '_ob_glider_loop' );
                settingz.direction = this.getElementSettings( '_ob_glider_direction' );
                settingz.parallax = this.getElementSettings( '_ob_glider_parallax' );
                settingz.speed = this.getElementSettings( '_ob_glider_speed' );
                var autoplayed = this.getElementSettings( '_ob_glider_autoplay' );
                if( autoplayed ) {
                    settingz.autoplay = {
                        'delay': this.getElementSettings( '_ob_glider_autoplay_delay' ), 
                    }
                } else settingz.autoplay = false;

                // run swiper
                makeSwiper( this.$element.attr( 'data-id' ), settingz );

            }, 

        } );

        var ColumnExtends = elementorModules.frontend.handlers.Base.extend( {

            onInit: function onInit() {

                elementorModules.frontend.handlers.Base.prototype.onInit.apply( this, arguments );
                // is E3.0 column?
                if( ! this.$element.find( '.elementor-column-wrap' ).first().length ) this.$element.addClass( 'ob-is-e3' );
                // Teleporter issue with Chrome
                var ua = navigator.userAgent.toLowerCase();
                if( ua.indexOf( 'chrome' ) > -1 ) this.teleporterChromeResize();
                // columns...
                this.initColumnExtends();

            },
            teleporterChromeResize: function() {

                if( ! this.isTeleporter() ) return;

                var dis = this;
                var myID = this.$element.attr( 'data-id' ); 
                $window.on( 'resize', function() { 
                    dis.$element.closest( '.ob-is-teleporter' ).addClass( 'ob-chrome-resize' );
                    clearTimeout( myID );   
                    myID = setTimeout( function() { 
                        var column_height = parseInt( dis.$element.closest( '.ob-is-teleporter' ).css( 'height' ) );
                        var col_wrap = dis.$element.find( '.elementor-column-wrap' ).first();
                        if( col_wrap.length ) col_wrap.css( { 'height': column_height } );
                        else {
                            dis.$element.find( '.elementor-widget-wrap' ).first().css( { 'height': column_height } );
                        }
                        dis.$element.closest( '.ob-is-teleporter' ).removeClass( 'ob-chrome-resize' ); 
                    }, 500 );
                } ); 
                $window.trigger( 'resize' );
                
            },
            /* Teleporter */
            isTeleporter: function() {
                return this.$element.hasClass( 'ob-is-teleporter' );
            }, 
            /* Hoveranimator */
            isHoverAnimatorCol: function() {
                return this.$element.hasClass( 'ob-is-hoveranimator' );
            },
            initColumnExtends: function() {
                /* Teleporter */
                if( this.isEdit && 'use-teleporter' === this.getElementSettings( '_ob_teleporter_use' ) ) { 
                    this.$element.addClass( 'ob-is-teleporter' ); 
                    this.$element.find( '.elementor-widget-wrap' ).first().addClass( 'ob-tele-midget' ); 
                    this.doTeleporterEditor(); 
                } 
                if( ! this.isEdit && this.isTeleporter() ) {
                    this.$element.find( '.elementor-widget-wrap' ).first().addClass( 'ob-tele-midget' ); 
                    this.doTeleporter(); 
                }
                /* Hoveranimator */
                if( this.isEdit && 'yes' === this.getElementSettings( '_ob_column_hoveranimator' ) ) {
                    this.$element.addClass( 'ob-is-hoveranimator' ); 
                }

            }, 
            onElementChange: function( changedProp ) {
                
                if( changedProp === '_ob_teleporter_overlay_color' ) {
                    this.$element.find( 'div[class*="ob-teleporter-"] > .ob-tele-overlay' ).css( 'background-color', this.getElementSettings( '_ob_teleporter_overlay_color' ) );
                } else if( changedProp === '_ob_teleporter_no_pass_tablet' ) {
                    if( 'no-tablet' === this.getElementSettings( '_ob_teleporter_no_pass_tablet' ) ) 
                        this.$element.addClass( 'ob-tele-no-tablet' );
                    else 
                        this.$element.removeClass( 'ob-tele-no-tablet' );
                } else if( changedProp === '_ob_teleporter_no_pass_mobile' ) {
                    if( 'no-mobile' === this.getElementSettings( '_ob_teleporter_no_pass_mobile' ) ) 
                        this.$element.addClass( 'ob-tele-no-mobile' ); 
                    else 
                        this.$element.removeClass( 'ob-tele-no-mobile' ); 
                }
                /* Hoveranimator */
                if( changedProp === '_ob_column_hoveranimator' ) {
                    this.routeHoverAnimatorCol();
                }

            },
            routeHoverAnimatorCol: function() {
                
                if( ! this.isHoverAnimatorCol() && 'yes' === this.getElementSettings( '_ob_column_hoveranimator' ) ) this.$element.addClass( 'ob-is-hoveranimator' ); 
                else this.$element.removeClass( 'ob-is-hoveranimator' );

            },

            doTeleporterEditor: function() {

                if( 'use-teleporter' !== this.getElementSettings( '_ob_teleporter_use' ) ) return; // bail

                // E3.0+ wrap the children of .elementor-widget-wrap for the animation purpose
                var widgets_wrapper = this.$element.find( '.elementor-widget-wrap' ).first();
                if( widgets_wrapper.length ) {
                    widgets_wrapper.wrapInner( '<div class="widget-wrap-children" />' );
                    if( widgets_wrapper.find( '.elementor-background-overlay' ).first().length ) {
                        widgets_wrapper.find( '.elementor-background-overlay' ).first().insertBefore( widgets_wrapper.find( '.elementor-background-overlay' ).first().parent() );
                    }
                }

                if( 'do-pass' !== this.getElementSettings( '_ob_teleporter_pass' ) ) return; // bail too

                var this_ob = this;
                var myself  = this.$element;
                var my_id   = this.$element.attr( 'data-id' ); 

                // default classes
                if( 'no-tablet' === this.getElementSettings( '_ob_teleporter_no_pass_tablet' ) ) 
                    this.$element.addClass( 'ob-tele-no-tablet' );
                if( 'no-mobile' === this.getElementSettings( '_ob_teleporter_no_pass_mobile' ) ) 
                    this.$element.addClass( 'ob-tele-no-mobile' ); 

                // this column's parent section
                var parent_section = ( 'section' === this.getElementSettings( '_ob_teleporter_pass_element' ) ) ? this.$element.closest( '.elementor-section' ) : this.$element.closest( '.elementor-container' ); 
                if( ! parent_section.length ) return; // bail

                // parent overflow
                parent_section.css( 'overflow', 'hidden' ); 

                // new element & effect
                var hover_effect  = this.getElementSettings( '_ob_teleporter_pass_effect' );
                var hover_element = '<div class="ob-teleporter-' + my_id + ' ob-tele-eff-' + hover_effect + '" data-id-teleporter="' + my_id + '"><div class="ob-tele-overlay" style="background-color: ' + this.getElementSettings( '_ob_teleporter_overlay_color' ) + ';"></div></div>';

                if( ! $( '.ob-teleporter-' + my_id ).length ) this.$element.prepend( hover_element );

                this.$element.off( 'mouseenter mouseleave' );
                this.$element.on( 'mouseenter mouseleave', function( ev ) {

                    if( 'mouseenter' === ev.type ) {

                        if( 'no-tablet' === this_ob.getElementSettings( '_ob_teleporter_no_pass_tablet' ) && 
                        'tablet' === elementorFrontend.getCurrentDeviceMode() ) return; // bail
                        if( 'no-mobile' === this_ob.getElementSettings( '_ob_teleporter_no_pass_mobile' ) && 
                            'mobile' === elementorFrontend.getCurrentDeviceMode() ) return; // bail
                        if( 'do-pass' !== this_ob.getElementSettings( '_ob_teleporter_pass' ) ) return;

                        var tele_css = { 
                            'background-color': $( '.ob-teleporter-' + my_id ).css( 'background-color' ),
                            'background-image': $( '.ob-teleporter-' + my_id ).css( 'background-image' ),
                            'background-position': $( '.ob-teleporter-' + my_id ).css( 'background-position' ),
                            'background-size': $( '.ob-teleporter-' + my_id ).css( 'background-size' ),
                            'background-repeat': $( '.ob-teleporter-' + my_id ).css( 'background-repeat' )
                        };
                        
                        if( 'section' === this_ob.getElementSettings( '_ob_teleporter_pass_element' ) ) {
                            var all_children = parent_section.children().not( '.elementor-container' ).detach();
                            parent_section.addClass( 'ob-tele-mom-hover' ).prepend( $( '.ob-teleporter-' + my_id ) );
                            parent_section.prepend( all_children );
                        } else { 
                            parent_section.addClass( 'ob-tele-mom-hover' ).prepend( $( '.ob-teleporter-' + my_id ) );
                        }
                        
                        $( '.ob-teleporter-' + my_id ).css( tele_css ).hide();
                        $( '.ob-teleporter-' + my_id ).addClass(  'ob-teleporter-hover' ).show(); 

                    } else {

                        parent_section.removeClass( 'ob-tele-mom-hover' );
                        setTimeout( function() {
                            $( '.ob-teleporter-' + my_id ).removeAttr( 'style' ).removeClass( 'ob-teleporter-hover' );
                            myself.prepend( $( '.ob-teleporter-' + my_id ) ); 
                        }, 100 );

                    }

                } );
            
            }, 
            doTeleporter: function() {

                var teleporter_settings = $.parseJSON( this.$element.attr( 'data-settings' ) );

                if( 'use-teleporter' !== teleporter_settings._ob_teleporter_use ) return; // bail

                // E3.0+ wrap the children of .elementor-widget-wrap for the animation purpose
                var widgets_wrapper = this.$element.find( '.elementor-widget-wrap' ).first();
                if( widgets_wrapper.length ) {
                    widgets_wrapper.wrapInner( '<div class="widget-wrap-children" />' );
                    if( widgets_wrapper.find( '.elementor-background-overlay' ).first().length ) {
                        widgets_wrapper.find( '.elementor-background-overlay' ).first().insertBefore( widgets_wrapper.find( '.elementor-background-overlay' ).first().parent() );
                    }
                }

                if( 'do-pass' !== teleporter_settings._ob_teleporter_pass ) return; // bail too

                var myself = this.$element;
                var my_id  = this.$element.attr( 'data-id' ); 

                // default classes
                if( 'no-tablet' === teleporter_settings._ob_teleporter_no_pass_tablet ) 
                    this.$element.addClass( 'ob-tele-no-tablet' );
                if( 'no-mobile' === teleporter_settings._ob_teleporter_no_pass_mobile ) 
                    this.$element.addClass( 'ob-tele-no-mobile' ); 
                 
                // this column's parent section
                var parent_section = ( 'section' === teleporter_settings._ob_teleporter_pass_element ) ? this.$element.closest( '.elementor-section' ) : this.$element.closest( '.elementor-container' ); 
                if( ! parent_section.length ) return; // bail

                // parent overflow
                parent_section.css( 'overflow', 'hidden' );


                // new element
                var hover_effect  = teleporter_settings._ob_teleporter_pass_effect;
                var hover_element = '<div class="ob-teleporter-' + my_id + ' ob-tele-eff-' + hover_effect + '" data-id-teleporter="' + my_id + '"><div class="ob-tele-overlay" style="background-color: ' + teleporter_settings._ob_teleporter_overlay_color + ';"></div>';

                if( ! $( '.ob-teleporter-' + my_id ).length ) this.$element.prepend( hover_element );

                this.$element.off( 'mouseenter mouseleave' );
                this.$element.on( 'mouseenter', function() { 

                    if( 'no-tablet' === teleporter_settings._ob_teleporter_no_pass_tablet && 
                        'tablet' === elementorFrontend.getCurrentDeviceMode() ) return; // bail
                    if( 'no-mobile' === teleporter_settings._ob_teleporter_no_pass_mobile && 
                        'mobile' === elementorFrontend.getCurrentDeviceMode() ) return; // bail

                    var tele_css = { 
                        'background-color': $( '.ob-teleporter-' + my_id ).css( 'background-color' ),
                        'background-image': $( '.ob-teleporter-' + my_id ).css( 'background-image' ),
                        'background-position': $( '.ob-teleporter-' + my_id ).css( 'background-position' ),
                        'background-size': $( '.ob-teleporter-' + my_id ).css( 'background-size' ),
                        'background-repeat': $( '.ob-teleporter-' + my_id ).css( 'background-repeat' )
                    };
                    
                    if( 'section' === teleporter_settings._ob_teleporter_pass_element ) {
                        var all_children = parent_section.children().not( '.elementor-container' ).detach();
                        parent_section.addClass( 'ob-tele-mom-hover' ).prepend( $( '.ob-teleporter-' + my_id ) );
                        parent_section.prepend( all_children );
                    } else parent_section.addClass( 'ob-tele-mom-hover' ).prepend( $( '.ob-teleporter-' + my_id ) );
                    
                    $( '.ob-teleporter-' + my_id ).css( tele_css ).hide();
                    $( '.ob-teleporter-' + my_id ).show().addClass( 'ob-teleporter-hover' );
                    
                } );
                
                this.$element.on( 'mouseleave', function() {
                    
                    parent_section.removeClass( 'ob-tele-mom-hover' );
                    setTimeout( function() {
                        $( '.ob-teleporter-' + my_id ).removeAttr( 'style' ).removeClass( 'ob-teleporter-hover' );
                        myself.prepend( $( '.ob-teleporter-' + my_id ) );
                    }, 100 );

                } );

                if( undefined !== teleporter_settings._ob_teleporter_link ) { 

                    var tele_link = teleporter_settings._ob_teleporter_link;
                    if( '' === tele_link.url ) return;

                    this.$element.off( 'click.obTeleporter' );
                    this.$element.on( 'click.obTeleporter', function() {
                        if( tele_link.is_external ) window.open( tele_link.url ); 
                        else location.href = tele_link.url;
                    } );

                }
 
            }, 

        } );

        var SearchCop = elementorModules.frontend.handlers.Base.extend( {

            onInit: function() {

                elementorModules.frontend.handlers.Base.prototype.onInit.apply( this, arguments );
                this.initSearchCop();

            },

            onElementChange: function( changedProp ) {

                if( changedProp === '_ob_searchcop_srch_options' ) this.routeSearchCop();
                
            },

            initSearchCop: function() {

                this.routeSearchCop();

            }, 

            routeSearchCop: function() {
                var search_cop_val = this.getElementSettings( '_ob_searchcop_srch_options' );
                if( 'post' === search_cop_val || 'page' === search_cop_val ) {
                    var this_input_wrapper = this.$element.find( '.elementor-search-form__container' );
                    if( ! this_input_wrapper.length ) return;
                    var param_input = '<input type="hidden" name="post_type" value="' + search_cop_val + '" />';
                    this_input_wrapper.prepend( param_input );
                }
            },

        } );

        var ButterButton = elementorModules.frontend.handlers.Base.extend( {

            onInit: function() {

                elementorModules.frontend.handlers.Base.prototype.onInit.apply( this, arguments );
                this.initButterButton();

            }, 

            isButterButton: function() {

                return this.$element.hasClass( 'ob-is-butterbutton' );

            },

            onElementChange: function( changedProp ) {

                if( changedProp === '_ob_butterbutton_use_it' ) { 
                    this.routeButterButton();
                }
                
            },

            initButterButton: function() {

                if( this.isEdit && 'yes' === this.getElementSettings( '_ob_butterbutton_use_it' ) ) {
                    this.$element.addClass( 'ob-is-butterbutton' );
                } 

            }, 

            routeButterButton: function() {
                
                if( ! this.isButterButton() && 'yes' === this.getElementSettings( '_ob_butterbutton_use_it' ) ) this.$element.addClass( 'ob-is-butterbutton' ); 
                else this.$element.removeClass( 'ob-is-butterbutton' );

            },


        } );

        var PhotoMorph = elementorModules.frontend.handlers.Base.extend( {

            onInit: function() {

                elementorModules.frontend.handlers.Base.prototype.onInit.apply( this, arguments );
                this.initPhotoMorph();

            }, 

            isPhotoMorph: function() {

                return this.$element.hasClass( 'ob-photomorph' );

            },

            onElementChange: function( changedProp ) {

                if( changedProp === '_ob_photomorph_use' ) { 
                    this.routePhotoMorph();
                }
                
            },

            initPhotoMorph: function() {

                if( this.isEdit && 'yes' === this.getElementSettings( '_ob_photomorph_use' ) ) {
                    this.$element.addClass( 'ob-photomorph' );
                } 

            }, 

            routePhotoMorph: function() {
                
                if( ! this.isPhotoMorph() && 'yes' === this.getElementSettings( '_ob_photomorph_use' ) ) this.$element.addClass( 'ob-photomorph' ); 
                else this.$element.removeClass( 'ob-photomorph' );

            },


        } );

        var Commentz = elementorModules.frontend.handlers.Base.extend( {

            onInit: function() {

                elementorModules.frontend.handlers.Base.prototype.onInit.apply( this, arguments );
                this.initCommentz();

            }, 

            isCommentz: function() {

                return this.$element.hasClass( 'ob-commentz' );

            },

            onElementChange: function( changedProp ) {

                if( changedProp === '_ob_commentz_use' ) { 
                    this.routeCommentz();
                }
                
            },

            initCommentz: function() {

                if( this.isEdit && 'yes' === this.getElementSettings( '_ob_commentz_use' ) ) {
                    this.$element.addClass( 'ob-commentz' );
                } 

            }, 

            routeCommentz: function() {
                
                if( ! this.isCommentz() && 'yes' === this.getElementSettings( '_ob_commentz_use' ) ) this.$element.addClass( 'ob-commentz' ); 
                else this.$element.removeClass( 'ob-commentz' );

            },


        } );

        var SpaceRat = elementorModules.frontend.handlers.Base.extend( {

            onInit: function() {

                elementorModules.frontend.handlers.Base.prototype.onInit.apply( this, arguments );
                this.initSpaceRat();

            }, 

            isSpaceRat: function() {

                return this.$element.hasClass( 'ob-spacerat' );

            },

            onElementChange: function( changedProp ) {

                if( changedProp === '_ob_spacerat_use' ) { 
                    this.routeSpaceRat();
                }
                
            },

            initSpaceRat: function() {

                if( this.isEdit && 'yes' === this.getElementSettings( '_ob_spacerat_use' ) ) {
                    this.$element.addClass( 'ob-spacerat' );
                } 

                if( ! this.isEdit && 'yes' === this.getElementSettings( '_ob_spacerat_use' ) ) {

                    var spacerat_settings = $.parseJSON( this.$element.attr( 'data-settings' ) );

                    if( undefined !== spacerat_settings._ob_spacerat_link ) {
                    
                        var spacerat_link = spacerat_settings._ob_spacerat_link;
                        if( '' === spacerat_link.url ) return;

                        this.$element.off( 'click.obSpacerat' );
                        this.$element.on( 'click.obSpacerat', function() {
                            if( spacerat_link.is_external ) window.open( spacerat_link.url ); 
                            else location.href = spacerat_link.url;
                        } );

                    }

                }

            }, 

            routeSpaceRat: function() {
                
                if( ! this.isSpaceRat() && 'yes' === this.getElementSettings( '_ob_spacerat_use' ) ) this.$element.addClass( 'ob-spacerat' ); 
                else this.$element.removeClass( 'ob-spacerat' );

            },


        } );

        var handlersList = {

            'widget': PoopArtPerspektiveHA, 
            'heading.default': Harakiri, 
            'text-editor.default': Harakiri, 
            'section': SectionExtends, 
            'column': ColumnExtends, 
            'search-form.default': SearchCop, 
            'button.default': ButterButton, 
            'image.default': PhotoMorph, 
            'post-comments.theme_comments': Commentz, 
            'spacer.default': SpaceRat

        };

        $.each( handlersList, function( widgetName, handlerClass ) {

            elementorFrontend.hooks.addAction( 'frontend/element_ready/' + widgetName, function( $scope ) {
                
                elementorFrontend.elementsHandler.addHandler( handlerClass, { $element: $scope } );

            } );

        } );

    } ); 

    var makeSwiper = function( elem_id, settings ) {

        var the_s = $( '.elementor-element-' + elem_id + ' .swiper-container' ).first();
        
        var me_the_swiper = new Swiper( the_s, {
            allowTouchMove: ( 'yes' === settings.allowTouchMove ? true : false ), 
            autoHeight: ( 'yes' === settings.autoheight ? true : false ), 
            effect: settings.effect, 
            loop: settings.loop, 
            direction: ( 'fade' === settings.effect ? 'horizontal' : settings.direction ), 
            parallax: ( 'yes' === settings.parallax ? true : false ),
            speed: settings.speed, 
            navigation: {
                nextEl: '.elementor-element-' + elem_id + ' .swiper-button-next',
                prevEl: '.elementor-element-' + elem_id + ' .swiper-button-prev',
            },
            pagination: {
                el: '.elementor-element-' + elem_id + ' .swiper-pagination', 
                type: settings.pagination_type, 
                clickable: true, 
            },
            autoplay: settings.autoplay,
            watchOverflow : true, /* gotta force it down */ 
        } );
        
        the_s.find( '.glider-control' ).on( 'click', function( e ) {
            if( typeof $( this ).data( 'gotoslide' ) !== 'undefined' ) {
                me_the_swiper.slideTo( parseInt( $( this ).data( 'gotoslide' ) ) - 1 );
            }
            e.preventDefault();
        } );
        
    }

} ( jQuery, window ) );