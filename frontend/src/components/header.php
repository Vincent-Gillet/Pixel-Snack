<?php
$phone = get_field('social-phone', 'option');
$email = get_field('social-e-mail', 'option');
$facebook = get_field('social-facebook', 'option');
$twitter = get_field('social-twitter', 'option');
$youtube = get_field('social-youtube', 'option');
$instagram = get_field('social-instagram', 'option');
$logo = get_field('default-logo', 'option');

// displaySvg dans function.php

?>

<!doctype html>
<html lang="fr">

<head>

    <!-- General Metas -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover">

    <!-- WordPress -->
    <title><?php wp_title(); ?></title>
    <?php wp_head(); ?>


</head>

<body <?php body_class(); ?>>
    <header id="site-header">
        <div class="headband-nav">
            <div class="container">
                <div class="container-nav">
                    <div class="headband-contact">
                        <?php if ($phone) : ?>

                            <div class="headband-contact-element">
                                <a href="tel:<?php echo $phone ?>">
                                    <?php echo displaySvg('phone'); ?>
                                    <div><?php echo $phone ?></div>
                                </a>
                            </div>
                        <?php endif ?>
                        <?php if ($email) : ?>

                            <div class="headband-contact-element">
                                <a href="mailto:<?php echo $email ?>">
                                    <?php echo displaySvg('email'); ?>
                                    <div><?php echo $email ?></div>
                                </a>
                            </div>
                        <?php endif ?>
                    </div>
                    <div class="headband-social-link">
                        <?php if ($facebook) : ?>
                            <a href="<?php echo $facebook ?>" target="_blank" alt="facebook">
                                <?php echo displaySvg('header/facebook'); ?>
                            </a>
                        <?php endif ?>
                        <?php if ($twitter) : ?>
                            <a href="<?php echo $twitter ?>" target="_blank" alt="twitter">
                                <?php echo displaySvg('header/twitter'); ?>
                            </a>
                        <?php endif ?>
                        <?php if ($youtube) : ?>
                            <a href="<?php echo $youtube ?>" target="_blank" alt="youtube">
                                <?php echo displaySvg('header/youtube'); ?>
                            </a>
                        <?php endif ?>
                        <?php if ($instagram) : ?>
                            <a href="<?php echo $instagram ?>" target="_blank" alt="instagram">
                                <?php echo displaySvg('header/instagram'); ?>
                            </a>
                        <?php endif ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="navigation-bar">
            <div class="container">
                <div class="container-logo">
                    <a href="<?php echo get_permalink(11); ?>" alt="Logo Clermont Sports">
                        <img src="<?php echo $logo['url'] ?>" alt="<?php echo $logo['alt'] ?>" />
                    </a>
                </div>
                <div class="container-search-navigation">
                    <div class="container-search">
                        <form action="/" method="get">
                            <input type="text" class="btn-text-search" id="search" name="s" value="<?php the_search_query(); ?>" placeholder="Rechercher une actualité" />
                            <input type="hidden" value="post" name="post_type" id="post_type" />
                            <input type="submit" class="btn-submit-search black-borders" value="Rechercher" />
                        </form>


                    </div>
                    <div class="container-navigation">
                        <?php wp_nav_menu([
                            'menu'    => 'Menu principal',
                            'menu_class'        => 'menu-principal',
                            'items_wrap'        => '<ul class="%2$s">%3$s</ul>',
                        ]); ?>
                    </div>
                    <div class="container-navigation-burger">
                        <button class="burger-menu-button" aria-label="Menu">
                            <div class="burger-line"></div>
                            <div class="burger-line"></div>
                            <div class="burger-line"></div>
                        </button>
                        <?php wp_nav_menu([
                            'menu'    => 'Menu principal',
                            'menu_class'        => 'menu-principal',
                            'items_wrap'        => '<ul class="%2$s">%3$s</ul>',
                        ]); ?>
                    </div>
                </div>

            </div>
        </div>
        <div class="container">
            <?php
            if (function_exists('yoast_breadcrumb')) {
                yoast_breadcrumb('<p id="breadcrumbs" class="breadcrumbs">', '</p>');
            }
            ?>
        </div>
    </header>