<?php
use Elementor\Controls_Manager;
use Elementor\Controls_Stack;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Main OoohBoi Overlaiz
 *
 * The main class that initiates and runs the plugin.
 *
 * @since 1.0.0
 */
class OoohBoi_Overlaiz {

	/**
	 * Initialize 
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public static function init() {

		add_action( 'elementor/element/section/section_background_overlay/before_section_end',  [ __CLASS__, 'ooohboi_overlaiz_get_controls' ], 10, 2 );
		add_action( 'elementor/element/column/section_background_overlay/before_section_end',  [ __CLASS__, 'ooohboi_overlaiz_get_controls' ], 10, 2 );

	}
	
	public static function ooohboi_overlaiz_get_controls( $element, $args ) {

		// selector based on the current element
		$selector = '{{WRAPPER}} > .elementor-column-wrap > .elementor-background-overlay, {{WRAPPER}} > .elementor-widget-wrap > .elementor-background-overlay';
		if( 'section' == $element->get_name() ) 
			$selector = '{{WRAPPER}} > .elementor-background-overlay'; 


		$element->add_control(
			'_ob_overlaiz_plugin_title',
			[
				'label' => 'O V E R L A I Z', 
				'type' => Controls_Manager::HEADING,
				'separator' => 'before', 
				'condition' => [
                    'background_overlay_background' => [ 'classic', 'gradient' ],
				],
			]
		);

		// ------------------------------------------------------------------------- CONTROL: Use Overlaiz
		$element->add_control(
			'_ob_overlaiz_use_it',
			[
                'label' => __( 'Enable Overlaiz?', 'ooohboi-steroids' ), 
				'separator' => 'after', 
				'type' => Controls_Manager::SWITCHER,
				'label_on' => __( 'Yes', 'ooohboi-steroids' ),
				'label_off' => __( 'No', 'ooohboi-steroids' ),
				'return_value' => 'yes',
				'default' => 'no',
				'condition' => [
                    'background_overlay_background' => [ 'classic', 'gradient' ],
				],
			]
		);

		// ------------------------------------------------------------------------- CONTROL: background overlay width
		$element->add_responsive_control(
			'_ob_overlaiz_width',
			[
				'label' => __( 'Width', 'ooohboi-steroids' ),
				'type' => Controls_Manager::SLIDER,
				'size_units' => [ 'px', '%' ],
				'default' => [
					'unit' => '%',
					'size' => 100,
				],
				'default_tablet' => [
					'unit' => '%',
					'size' => 100,
				],
				'default_mobile' => [
					'unit' => '%',
					'size' => 100,
				],
				'range' => [
					'px' => [
						'min' => -500,
						'max' => 500,
					],
					'%' => [
						'min' => 5,
						'max' => 500,
					],
				],
				'selectors' => [
					$selector => 'width: {{SIZE}}{{UNIT}};',
				],
				'condition' => [
					'_ob_overlaiz_use_it' => 'yes', 
					'background_overlay_background' => [ 'classic', 'gradient' ], 
					'_ob_overlaiz_width_alt' => '', 
				],
				'device_args' => [
					Controls_Stack::RESPONSIVE_TABLET => [
						'selectors' => [
							$selector => 'width: {{SIZE}}{{UNIT}};',
						],
					],
					Controls_Stack::RESPONSIVE_MOBILE => [
						'selectors' => [
							$selector => 'width: {{SIZE}}{{UNIT}};',
						],
					],
				],
			]
		);
		// --------------------------------------------------------------------------------------------- CONTROL: background overlay width - Alternative
        $element->add_responsive_control(
            '_ob_overlaiz_width_alt',
            [
				'label' => __( 'Calc Width', 'ooohboi-steroids' ),
				'description' => __( 'Enter CSS calc value only! Like: 100% - 50px or 100% + 2em', 'ooohboi-steroids' ),
				'type' => Controls_Manager::TEXT,
				'selectors' => [
					$selector => 'width: calc({{VALUE}});',
				],
				'condition' => [
					'_ob_overlaiz_use_it' => 'yes', 
					'background_overlay_background' => [ 'classic', 'gradient' ], 
				],
			]
		);
		// ------------------------------------------------------------------------- CONTROL: background overlay height
		$element->add_responsive_control(
			'_ob_overlaiz_height',
			[
				'label' => __( 'Height', 'ooohboi-steroids' ),
				'type' => Controls_Manager::SLIDER,
				'size_units' => [ 'px', '%' ],
				'default' => [
					'unit' => '%',
					'size' => 100,
				],
				'default_tablet' => [
					'unit' => '%',
					'size' => 100,
				],
				'default_mobile' => [
					'unit' => '%',
					'size' => 100,
				],
				'range' => [
					'px' => [
						'min' => -500,
						'max' => 500,
					],
					'%' => [
						'min' => 5,
						'max' => 500,
					],
				],
				'selectors' => [
					$selector => 'height: {{SIZE}}{{UNIT}};',
				],
				'condition' => [
					'_ob_overlaiz_use_it' => 'yes', 
					'background_overlay_background' => [ 'classic', 'gradient' ], 
					'_ob_overlaiz_height_alt' => '', 
				],
				'device_args' => [
					Controls_Stack::RESPONSIVE_TABLET => [
						'selectors' => [
							$selector => 'height: {{SIZE}}{{UNIT}};',
						],
					],
					Controls_Stack::RESPONSIVE_MOBILE => [
						'selectors' => [
							$selector => 'height: {{SIZE}}{{UNIT}};',
						],
					],
				],
			]
		);
		// --------------------------------------------------------------------------------------------- CONTROL: background overlay height - Alternative
        $element->add_responsive_control(
            '_ob_overlaiz_height_alt',
            [
				'label' => __( 'Calc Height', 'ooohboi-steroids' ),
				'description' => __( 'Enter CSS calc value only! Like: 100% - 50px or 100% + 2em', 'ooohboi-steroids' ),
				'type' => Controls_Manager::TEXT,
				'selectors' => [
					$selector => 'height: calc({{VALUE}});',
				],
				'condition' => [
					'_ob_overlaiz_use_it' => 'yes', 
					'background_overlay_background' => [ 'classic', 'gradient' ], 
				],
			]
		);
		// ------------------------------------------------------------------------- CONTROL: move background overlay - X
		$element->add_responsive_control(
			'_ob_overlaiz_move_bg_x',
			[
				'label' => __( 'Position - X', 'ooohboi-steroids' ),
				'type' => Controls_Manager::SLIDER,
				'size_units' => [ 'px', '%' ],
				'default' => [
					'unit' => '%',
					'size' => 0,
				],
				'default_tablet' => [
					'unit' => '%',
					'size' => 0,
				],
				'default_mobile' => [
					'unit' => '%',
					'size' => 0,
				],
				'range' => [
					'px' => [
						'min' => -500,
						'max' => 500,
					],
					'%' => [
						'min' => -100,
						'max' => 100,
					],
				],
				'selectors' => [
					$selector => 'left: {{SIZE}}{{UNIT}};',
				],
				'condition' => [
					'_ob_overlaiz_use_it' => 'yes', 
					'background_overlay_background' => [ 'classic', 'gradient' ], 
					'_ob_overlaiz_move_bg_x_alt' => '', 
				],
				'device_args' => [
					Controls_Stack::RESPONSIVE_TABLET => [
						'selectors' => [
							$selector => 'left: {{SIZE}}{{UNIT}};',
						],
					],
					Controls_Stack::RESPONSIVE_MOBILE => [
						'selectors' => [
							$selector => 'left: {{SIZE}}{{UNIT}};',
						],
					],
				],
			]
		);
		// --------------------------------------------------------------------------------------------- CONTROL: move background overlay - X - Alternative
        $element->add_responsive_control(
            '_ob_overlaiz_move_bg_x_alt',
            [
				'label' => __( 'Calc Position - X', 'ooohboi-steroids' ),
				'description' => __( 'Enter CSS calc value only! Like: 100% - 50px or 100% + 2em', 'ooohboi-steroids' ),
				'type' => Controls_Manager::TEXT,
				'selectors' => [
					$selector => 'left: calc({{VALUE}});',
				],
				'condition' => [
					'_ob_overlaiz_use_it' => 'yes', 
					'background_overlay_background' => [ 'classic', 'gradient' ], 
				],
			]
		);
		// ------------------------------------------------------------------------- CONTROL: Magic Overlays - move background overlay - Y
		$element->add_responsive_control(
			'_ob_overlaiz_move_bg_y',
			[
				'label' => __( 'Position - Y', 'ooohboi-steroids' ),
				'type' => Controls_Manager::SLIDER,
				'size_units' => [ 'px', '%' ],
				'default' => [
					'unit' => '%',
					'size' => 0,
				],
				'default_tablet' => [
					'unit' => '%',
					'size' => 0,
				],
				'default_mobile' => [
					'unit' => '%',
					'size' => 0,
				],
				'range' => [
					'px' => [
						'min' => -500,
						'max' => 500,
					],
					'%' => [
						'min' => -100,
						'max' => 100,
					],
				],
				'selectors' => [
					$selector => 'top: {{SIZE}}{{UNIT}};',
				],
				'condition' => [
					'_ob_overlaiz_use_it' => 'yes', 
					'background_overlay_background' => [ 'classic', 'gradient' ], 
					'_ob_overlaiz_move_bg_y_alt' => '', 
				],
				'device_args' => [
					Controls_Stack::RESPONSIVE_TABLET => [
						'selectors' => [
							$selector => 'top: {{SIZE}}{{UNIT}};',
						],
					],
					Controls_Stack::RESPONSIVE_MOBILE => [
						'selectors' => [
							$selector => 'top: {{SIZE}}{{UNIT}};',
						],
					],
				],
			]
		);
		// --------------------------------------------------------------------------------------------- CONTROL: move background overlay - Y - Alternative
		$element->add_responsive_control(
			'_ob_overlaiz_move_bg_y_alt',
			[
				'label' => __( 'Calc Position - Y', 'ooohboi-steroids' ),
				'description' => __( 'Enter CSS calc value only! Like: 100% - 50px or 100% + 2em', 'ooohboi-steroids' ),
				'type' => Controls_Manager::TEXT,
				'selectors' => [
					$selector => 'top: calc({{VALUE}});',
				],
				'condition' => [
					'_ob_overlaiz_use_it' => 'yes', 
					'background_overlay_background' => [ 'classic', 'gradient' ], 
				],
			]
		);
		// --------------------------------------------------------------------------------------------- CONTROL: ROTATION
		$element->add_responsive_control(
			'_ob_overlaiz_rot',
			[
				'label' => __( 'Rotation', 'ooohboi-steroids' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 360,
						'step' => 5,
					],
				],
				'default' => [
					'size' => 0,
				],
				'selectors' => [
					$selector => 'transform: rotate({{SIZE}}deg);',
				],
				'condition' => [
					'_ob_overlaiz_use_it' => 'yes', 
					'background_overlay_background' => [ 'classic', 'gradient' ], 
				],
			]
		);
		// --------------------------------------------------------------------------------------------- CONTROL POPOVER BORDER
		$element->add_control(
			'_ob_overlaiz_popover_border',
			[
				'label' => __( 'Border', 'ooohboi-steroids' ),
				'separator' => 'before', 
				'type' => Controls_Manager::POPOVER_TOGGLE,
				'return_value' => 'yes',
				'frontend_available' => true,
				'condition' => [
					'_ob_overlaiz_use_it' => 'yes', 
                    'background_overlay_background' => [ 'classic', 'gradient' ],
				],
			]
		);
		
		$element->start_popover();

		// --------------------------------------------------------------------------------------------- CONTROL POPOVER BORDER ALL
		$element->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => '_ob_overlaiz_borders', 
				'label' => __( 'Border', 'ooohboi-steroids' ), 
				'selector' => $selector, 
				'condition' => [
					'_ob_overlaiz_use_it' => 'yes', 
                    'background_overlay_background' => [ 'classic', 'gradient' ],
				],
			]
		);
		// --------------------------------------------------------------------------------------------- CONTROL POPOVER BORDER RADIUS
		$element->add_responsive_control(
			'_ob_overlaiz_border_rad',
			[
				'label' => __( 'Border Radius', 'ooohboi-steroids' ),
				'type' => Controls_Manager::DIMENSIONS, 
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					$selector  => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'condition' => [
					'_ob_overlaiz_use_it' => 'yes', 
                    'background_overlay_background' => [ 'classic', 'gradient' ],
				],
			]
		);

		$element->end_popover(); // popover BORdER end

		// --------------------------------------------------------------------------------------------- CONTROL Box Shadow
		$element->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name' => '_ob_overlaiz_shadow', 
				'label' => __( 'Box Shadow', 'ooohboi-steroids' ), 
				'separator' => 'before', 
				'selector' => $selector, 
				'fields_options' => [
					'box_shadow' => [
						'default' => [
							'horizontal' => 5,
							'vertical' => 5,
							'blur' => 10,
							'spread' => 3,
							'color' => 'rgba(0,0,0,0.2)',
						],
					],
				],
				'condition' => [
					'_ob_overlaiz_use_it' => 'yes', 
                    'background_overlay_background' => [ 'classic', 'gradient' ], 
                ],
			]
		);

		// --------------------------------------------------------------------------------------------- CONTROL Clip path

		$element->add_control(
			'_ob_overlaiz_clip_path_popover',
			[
				'label' => __( 'Clip path', 'ooohboi-steroids' ), 
				'type' => Controls_Manager::POPOVER_TOGGLE,
				'return_value' => 'yes', 
				'condition' => [
					'_ob_overlaiz_use_it' => 'yes', 
                    'background_overlay_background' => [ 'classic', 'gradient' ], 
                ],
			]
		);

		$element->start_popover();

		$element->add_control(
			'_ob_overlaiz_clip_path',
			[				
				'description' => sprintf(
                    __( 'Enter the full clip-path property! See the copy-paste examples at %sClippy%s', 'ooohboi-steroids' ),
                    '<a href="https://bennettfeely.com/clippy/" target="_blank">',
                    '</a>'
				),
				'default' => '', 
				'type' => Controls_Manager::TEXTAREA, 
				'rows' => 3, 
				'selectors' => [
					$selector => '{{VALUE}}',
				],
				'condition' => [
					'_ob_overlaiz_use_it' => 'yes', 
                    'background_overlay_background' => [ 'classic', 'gradient' ], 
                ],
			]
		);

		$element->end_popover(); // popover Clip path end
		
		// --------------------------------------------------------------------------------------------- CONTROL Z-INDeX
		$element->add_control(
			'_ob_overlaiz_z_index',
			[
				'label' => __( 'Z-Index', 'ooohboi-steroids' ),
				'type' => Controls_Manager::NUMBER, 
				'separator' => 'before', 
				'min' => -9999,
				'selectors' => [
					$selector => 'z-index: {{VALUE}};',
				],
				'condition' => [
					'_ob_overlaiz_use_it' => 'yes', 
                    'background_overlay_background' => [ 'classic', 'gradient' ], 
                ],
			]
		);

	}

}