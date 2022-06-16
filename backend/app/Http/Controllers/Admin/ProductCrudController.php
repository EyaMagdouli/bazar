<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\ProductRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use Egulias\EmailValidator\Exception\CRLFAtTheEnd;

/**
 * Class ProductCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class ProductCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    /**
     * Configure the CrudPanel object. Apply settings to all operations.
     *
     * @return void
     */
    public function setup()
    {
        CRUD::setModel(\App\Models\Product::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/product');
        CRUD::setEntityNameStrings('product', 'products');
    }

    /**
     * Define what happens when the List operation is loaded.
     *
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        CRUD::column('name');
        CRUD::column('marketplace_id');
        CRUD::addColumn('category_id');
        // CRUD::column('image');
        $this->crud->addColumn([
            'name'     => 'price',
            'label'    => 'Price',
            'type'     => 'closure',
            'function' => function ($entry) {
                return $entry->price . ' ' . $entry->priceUnity;
            }
        ],);
        $this->crud->addColumn([
            'name'     => 'qty',
            'label'    => 'Quantity',
            'type'     => 'closure',
            'function' => function ($entry) {
                return $entry->qty . ' ' . $entry->qtyUnity;
            }
        ],);
        CRUD::column('qty')->label('Quantity');

        /**
         * Columns can be defined using the fluent syntax or array syntax:
         * - CRUD::column('price')->type('number');
         * - CRUD::addColumn(['name' => 'price', 'type' => 'number']);
         */
    }

    /**
     * Define what happens when the Create operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(ProductRequest::class);

        CRUD::field('name');
        CRUD::field('marketplace_id');
        CRUD::field('category_id');
        CRUD::addField(
            [
                'name' => 'image',
                'label' => 'Image',
                'type' => 'upload',
                'upload' => true,
                'disk' => 'uploads', // if you store files in the /public folder, please omit this; if you store them in /storage or S3, please specify it;
            ],
        );
        CRUD::field('price')->type('number')->attributes(['min' => 0]);
        CRUD::field('qty')->type('number')->attributes(['min' => 0])->label('Quantity');
        CRUD::field('description');
        CRUD::addField([
            'name'        => 'qtyUnity',
            'label'       => 'Quantity unity',
            'type'        => 'radio',
            'options'     => [
                0 => 'g',
                1 => 'kg',
                2 => 't',
                3 => 'oz',
                4 => 'lb',
            ]
        ]);
        CRUD::addField([
            'name'        => 'priceUnity',
            'label'       => 'Price unity',
            'type'        => 'radio',
            'options'     => [
                0 => 'usd',
                1 => 'eur',
                2 => 'pound',
                3 => 'dt',
            ]
        ]);

        /**
         * Fields can be defined using the fluent syntax or array syntax:
         * - CRUD::field('price')->type('number');
         * - CRUD::addField(['name' => 'price', 'type' => 'number']));
         */
    }

    /**
     * Define what happens when the Update operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }


    protected function setupShowOperation()
    {
        CRUD::column('name');
        CRUD::column('marketplace_id');
        CRUD::addColumn('category_id');
        $this->crud->addColumn([
            'label' => 'image',
            'type'      => 'image',
            'name'      => 'image',
            'prefix'     => '/uploads/product/',
        ]);
        $this->crud->addColumn([
            'name'     => 'price',
            'label'    => 'Price',
            'type'     => 'closure',
            'function' => function ($entry) {
                return $entry->price . ' ' . $entry->priceUnity;
            }
        ],);
        $this->crud->addColumn([
            'name'     => 'qty',
            'label'    => 'Quantity',
            'type'     => 'closure',
            'function' => function ($entry) {
                return $entry->qty . ' ' . $entry->qtyUnity;
            }
        ],);
        CRUD::column('description');
        /**
         * Columns can be defined using the fluent syntax or array syntax:
         * - CRUD::column('price')->type('number');
         * - CRUD::addColumn(['name' => 'price', 'type' => 'number']);
         */
    }
}
