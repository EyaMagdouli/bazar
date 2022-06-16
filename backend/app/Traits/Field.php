<?php
namespace App\Traits;

trait Field {
public function enable_btn(){
    $this->crud->addButtonFromView('line','Marketplace request','btn_enable','beginning');

}
public function enable($id = null, $status = null)
{
if (request()->ajax()) {
$model = $this->crud->getModel();

if (!$item = $model::find($id)) {
return response()->json([
'status' => false,
'title' => __('Not accepted'),
'message' => __('Marketplace not accepted'),
]);
}

$item->update([
"accepted" => $status,
]);



return response()->json([
'status' => true,
'title' => __('Accepted'),
'message' => __('Marketplace Accepted'),
]);
}

return redirect()->to(backpack_url());
}
}
