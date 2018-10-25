function registerModal() {
  $('#registerModal').modal('show');
}

function exitModal() {
  $('#registerModal').modal('hide');
}

function sellModal(visible) {
  $('#sellModal').modal(visible);
}

function searchModal() {
  $('#searchModal').modal('show');
}

function buyModal(visible) {
  $('#buyModal').modal(visible);
}

function quickBuyModal(visible) {
  $('#quickBuyModal').modal(visible);
}

function initTypeahead(values) {

  $('#symbolSearch').typeahead({
    source: values,
    items: 10
  });
}

function initDataTable(){
  $('#buyTable').DataTable();
}
