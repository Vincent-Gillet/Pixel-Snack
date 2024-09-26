<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ingredient;

class IngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ingredients = [
            ['name' => 'Pomme'],
            ['name' => 'Banane'],
            ['name' => 'Carotte'],
            ['name' => 'Tomate'],
            ['name' => 'Poulet'],
            ['name' => 'Bœuf'],
            ['name' => 'Poisson'],
            ['name' => 'Lait'],
            ['name' => 'Œuf'],
            ['name' => 'Farine'],
            ['name' => 'Sucre'],
            ['name' => 'Sel'],
            ['name' => 'Poivre'],
            ['name' => 'Ail'],
            ['name' => 'Oignon'],
            ['name' => 'Beurre'],
            ['name' => 'Huile d\'olive'],
            ['name' => 'Riz'],
            ['name' => 'Pâtes'],
            ['name' => 'Pain'],
            ['name' => 'Fromage'],
            ['name' => 'Yaourt'],
            ['name' => 'Crème fraîche'],
            ['name' => 'Champignon'],
            ['name' => 'Courgette'],
            ['name' => 'Aubergine'],
            ['name' => 'Poivron'],
            ['name' => 'Brocoli'],
            ['name' => 'Chou-fleur'],
            ['name' => 'Épinard'],
            ['name' => 'Lentille'],
            ['name' => 'Haricot vert'],
            ['name' => 'Petit pois'],
            ['name' => 'Maïs'],
            ['name' => 'Pomme de terre'],
            ['name' => 'Patate douce'],
            ['name' => 'Navet'],
            ['name' => 'Radis'],
            ['name' => 'Betterave'],
            ['name' => 'Céleri'],
            ['name' => 'Fenouil'],
            ['name' => 'Poireau'],
            ['name' => 'Artichaut'],
            ['name' => 'Asperge'],
            ['name' => 'Avocat'],
            ['name' => 'Mangue'],
            ['name' => 'Ananas'],
            ['name' => 'Fraise'],
            ['name' => 'Framboise'],
            ['name' => 'Myrtille'],
            ['name' => 'Cerise'],
            ['name' => 'Pêche'],
            ['name' => 'Abricot'],
            ['name' => 'Prune'],
            ['name' => 'Raisin'],
            ['name' => 'Melon'],
            ['name' => 'Pastèque'],
            ['name' => 'Kiwi'],
            ['name' => 'Citron'],
            ['name' => 'Orange'],
            ['name' => 'Pamplemousse'],
            ['name' => 'Clémentine'],
            ['name' => 'Mandarine'],
            ['name' => 'Noix'],
            ['name' => 'Amande'],
            ['name' => 'Noisette'],
            ['name' => 'Pistache'],
            ['name' => 'Noix de cajou'],
            ['name' => 'Noix de coco'],
            ['name' => 'Basilic'],
            ['name' => 'Thym'],
            ['name' => 'Romarin'],
            ['name' => 'Persil'],
            ['name' => 'Coriandre'],
            ['name' => 'Menthe'],
            ['name' => 'Origan'],
            ['name' => 'Estragon'],
            ['name' => 'Aneth'],
            ['name' => 'Ciboulette'],
            ['name' => 'Sauge'],
            ['name' => 'Laurier'],
            ['name' => 'Gingembre'],
            ['name' => 'Curcuma'],
            ['name' => 'Cannelle'],
            ['name' => 'Clou de girofle'],
            ['name' => 'Muscade'],
            ['name' => 'Cardamome'],
            ['name' => 'Safran'],
            ['name' => 'Vanille'],
            ['name' => 'Piment'],
            ['name' => 'Paprika'],
            ['name' => 'Cumin'],
            ['name' => 'Curry'],
            ['name' => 'Fenugrec'],
            ['name' => 'Anis'],
            ['name' => 'Sésame'],
            ['name' => 'Pavot'],
            ['name' => 'Lin'],
            ['name' => 'Chocolat en poudre'],
            ['name' => 'Glace au chocolat'],
            ['name' => 'Crème chantilly'],
            ['name' => 'Glace'],
        ];

        foreach ($ingredients as $ingredient) {
            Ingredient::create($ingredient);
        }
    }
}