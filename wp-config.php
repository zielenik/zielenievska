<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'zielenievska_db' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '?JC!i(GBi8(5jEO>O)]}lmf?{GdO=FLtofZT+pJA2.cl/DYF?&Nl0Vi-0l$u[S^h' );
define( 'SECURE_AUTH_KEY',  '1H]TUY{{h;`gUu9bZq:8leecCpsxK%Wro5y=5%SuIW)eHF.8390]u1a)>f[1;ux9' );
define( 'LOGGED_IN_KEY',    'v6QVby-~d_RJ=2lbfER%lF&,JEZC0*{t,(l4NgHffa4-34aRNf7.=(jr}MCxCeWV' );
define( 'NONCE_KEY',        '7qlbeapIL=&.U}X56)E!i714%WyxBr D`B1RU]>;IX]rW<nF>)]2J`%GdC:5{/^w' );
define( 'AUTH_SALT',        '9?%L`Pc.MZ,haO,wB ?>>%K6h-%[SOG7%gX2iJ.K:8);rj!6~C3{Wp!W3%zp,iJS' );
define( 'SECURE_AUTH_SALT', '50fpm@~b+.YF<nO3+ahL?t&kQ+}qgTMq7LlV3Hy*ht,nrVjmxf9mgg!6;mXr?<[^' );
define( 'LOGGED_IN_SALT',   'A.?aG56h$iF9q;DQGM_?_sI`x0x3+#W_R}WrB.--})BLdV}xrWF-%q!g|DKYR&~0' );
define( 'NONCE_SALT',       'f@Pw~(jj#!o `&|*xym0#+*jM%F AhQ{M%x`OR^PX~, /IV=`uzu$Y!#E [7y+pY' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
