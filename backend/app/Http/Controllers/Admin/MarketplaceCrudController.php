<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\MarketplaceRequest;
use App\Mail\AcceptMarketplaceMail;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use Illuminate\Support\Facades\Mail;
use App\Traits\Field;

/**
 * Class MarketplaceCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class MarketplaceCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation { update as traitUpdate; }
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;
    use Field;

    /**
     * Configure the CrudPanel object. Apply settings to all operations.
     *
     * @return void
     */
    public function setup()
    {
        // dd('hi');
        $this->crud->setModel(\App\Models\Marketplace::class);
        $this->crud->setRoute(config('backpack.base.route_prefix') . '/marketplace');
        $this->crud->setEntityNameStrings('marketplace', 'marketplaces');
    }

    /**
     * Define what happens when the List operation is loaded.
     *
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        // $this->enable_btn();
        CRUD::column('name');
        CRUD::column('user')->type('relationship');
        CRUD::column('description');

        // CRUD::column('image');
        // CRUD::column('accepted');

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
        CRUD::setValidation(MarketplaceRequest::class);

        CRUD::field('name');
        CRUD::field('user')->type('relationship');
        CRUD::field('description');
        CRUD::field('image');
        CRUD::field('accepted')->type('toggle');

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
    public function update()
    {
        Mail::to($this->crud->getCurrentEntry()->user->email)->send(new AcceptMarketplaceMail($this->crud->getCurrentEntry()));
        $response = $this->traitUpdate();
        // do something after save
        return $response;
    }

        protected function setupShowOperation()
    {
        CRUD::column('name');
        // CRUD::column('marketplace_id');
        // CRUD::addColumn('category_id');
        $this->crud->addColumn([
            'label'=>'image',
            'type'      => 'image',
            'name'      => 'image',
            'prefix'     =>'/uploads/marketplace/',
        ]);
        // CRUD::column('price');
        /**
         * Columns can be defined using the fluent syntax or array syntax:
         * - CRUD::column('price')->type('number');
         * - CRUD::addColumn(['name' => 'price', 'type' => 'number']);
         */
    }
}
