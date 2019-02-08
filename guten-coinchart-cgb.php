<?php
/**
 * Plugin Name: Coin Chart Gutenberg Block Plugin
 * Plugin URI: https://github.com/kkuksin/guten-coinchart-cgb
 * Description: Coin Chart — is a Gutenberg plugin for add Live Coin Chart Widget Block to Posts or Pages.
 * Author: Kostiantyn Kuksin
 * Author URI: https://github.com/kkuksin
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
