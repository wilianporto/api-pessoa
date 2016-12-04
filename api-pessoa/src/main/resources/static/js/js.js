var app = angular.module("apiPessoa", []);
app.controller('apiCtrl', function($scope, PessoaApi){
    var isInclusao   = true;
    $scope.descbotao = 'Cadastrar';
    $scope.pessoa    = {};
    $scope.pessoas   = [];    
    refresh();
    $scope.enviaFormulario = function(){
        if(isInclusao){
            PessoaApi.inserir($scope.pessoa).then(function(){
                $scope.resetForm();
                $scope.pessoa = {};
                refresh();
            });
        }
        else{
            alteraMetodoForm(true);
            PessoaApi.alterar($scope.pessoa).then(function(){
                $scope.resetForm();
                $scope.pessoa = {};
                refresh();
            });
        }
    };
    $scope.excluir = function(pessoa){
        PessoaApi.excluir(pessoa).then(function(){
            refresh();
        });
    };
    $scope.alterar = function(pessoa){
        $scope.pessoa = angular.copy(pessoa);
        alteraMetodoForm(false);
    };
    $scope.resetForm = function(){
        alteraMetodoForm(true);
        $scope.pessoa = {};
        $scope.formCad.$setPristine();
    };
    function refresh(){
        PessoaApi.buscar().then(function(data){
            $scope.pessoas = data;
        });
    }
    function alteraMetodoForm(inclusao){
        isInclusao       = inclusao;
        $scope.descbotao = isInclusao ? 'Cadastrar' : 'Alterar';
    }
})
.factory('PessoaApi', function($q, $http){
    return {
        buscar: function(id){
            id = parseInt(id) ? parseInt(id) : '';
            var promise = $q.defer();
            $http.get('/api/pessoa/' + id).then(function(response){
                promise.resolve(response.data);
            }, function() {
                promise.reject();
            });
            return promise.promise;
        },
        inserir: function(pessoa) {
            return $http.post('/api/pessoa', pessoa);
        },
        alterar: function(pessoa){
            return $http.patch('/api/pessoa/' + pessoa.id, pessoa);
        },
        excluir: function(pessoa){
            return $http.delete('/api/pessoa/' + pessoa.id);
        }
    };
});