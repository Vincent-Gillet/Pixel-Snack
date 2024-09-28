<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['title' => 'Entrée', 'image' => 'https://img-3.journaldesfemmes.fr/KX37xZuExSWZtfhyN7iS-AYL3jU=/1240x/smart/a99c4f96ccfa47cc830cbde4f896eaa8/ccmcms-jdf/39957548.jpg'],
            ['title' => 'Plats Principal', 'image' => 'https://www.fruitdor.fr/-/media/Project/Upfield/Brands/Becel-NL/Becel-FR/Assets/Recipes/New-recipe-images/Varumarkesida_831x554px_Plantbased-recipe-ideas_4.jpg?rev=41d1610c0bbf426e9de99559728f7da5&w=1920'],
            ['title' => 'Dessert', 'image' => 'https://s3.amazonaws.com/gmi-digital-library/d4b45de8-1878-4deb-ae0e-a69807c42f2b.jpg'],
            ['title' => 'Film', 'image' => 'https://media.lesechos.com/api/v1/images/view/617520ce3e454671c141ae94/1280x720/070172591054-web-tete.jpg'],
            ['title' => 'Série', 'image' => 'https://www.radiofrance.fr/s3/cruiser-production-eu3/2022/10/cda4f4f8-a9f8-49f3-a43f-0fecfe60de8d/640x340_4527633-jpg-r-1920-1080-f-jpg-q-x-xxyxx.jpg'],
            ['title' => 'Animé', 'image' => 'https://static.hitek.fr/img/actualite/2016/02/01/fb_ponyo.jpg'],
            ['title' => 'Animation', 'image' => 'https://www.premiere.fr/sites/default/files/styles/partage_rs/public/2021-05/m_0.jpg'],
            ['title' => 'Super-héros', 'image' => 'https://i.ytimg.com/vi/xkWTqSJt9E8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB5kDeyiDorp0A5n7felB-40_31bg'],
            ['title' => 'Fantasie', 'image' => 'https://focus.telerama.fr/2023/12/28/0/0/1698/1132/1600/1067/60/0/926daeb_1703768924369-69-hobbitunvoyageinattendu-copie.jpg'],
            ['title' => 'Comédie', 'image' => 'https://aws.vdkimg.com/film/8/8/8/1/8881_backdrop_scale_1280xauto.jpg'],
            ['title' => 'Romance', 'image' => 'https://s1.dmcdn.net/v/Th0lW1Y7MEerqNBVO/x720'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}