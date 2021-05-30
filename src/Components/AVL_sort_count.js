var AVL = /** @class */ (function () {
  
    function AVL() {
        if (this.root === undefined) {
            this.root = null;
        }
        
        this.nodes = [];
        this.node_count = 0;

        this.root = null;
    }

    AVL.prototype.insert = function (key) {
        this.root = this.insertRec(this.root, key);
    };

    AVL.prototype.insertRec = function (root, key) {
        
        if (root == null) {
            root = new AVL.Node(this, key);
            return root;
        }

        if (key === root.key) {
            (root.count)++;
            return root;
        }

        var compare = key.localeCompare(root.key); 
        if (compare < 0)
        {
            root.left = this.insertRec(root.left, key);
        }
        else if (compare > 0)
        {
            root.right = this.insertRec(root.right, key);
        }
        return root;
    };

    AVL.prototype.inorderRec = function (root) {
        if (root != null) {

            this.inorderRec(root.left);
            this.nodes[this.node_count] = root; //add the nodes to the array of structs
            this.node_count++;
            this.inorderRec(root.right);
        }
    };

    AVL.prototype.treeins = function (arr) {
        
        for (var i = 0; i < arr.length; i++) {
            this.insert(arr[i]);
        }
    };

    AVL.prototype.merge = function (arr, l, m, r) {
        var n1 = m - l + 1;
        var n2 = r - m;
    
        // Create temp arrays
        var L = new Array(n1);
        var R = new Array(n2);
    
        // Copy data to temp arrays L[] and R[]
        for (var i = 0; i < n1; i++)
            L[i] = arr[l + i];
        for (var j = 0; j < n2; j++)
            R[j] = arr[m + 1 + j];
    
        // Merge the temp arrays back into arr[l..r]
    
        // Initial index of first subarray
        var i = 0;
    
        // Initial index of second subarray
        var j = 0;
    
        // Initial index of merged subarray
        var k = l;
    
        while (i < n1 && j < n2) {
            if (L[i].count >= R[j].count) {
                arr[k] = L[i];
                i++;
            }
            else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }
    
        // Copy the remaining elements of
        // L[], if there are any
        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }
    
        // Copy the remaining elements of
        // R[], if there are any
        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
    }

    AVL.prototype.mergesort = function (arr,l,r){
        if(l>=r) {
            return;//returns recursively
        }

        let m = l + parseInt((r-l)/2);
        this.mergesort(arr,l,m);
        this.mergesort(arr,m+1,r);
        this.merge(arr,l,m,r);
    }

    AVL.main = function (args) {
        
        var tree = new AVL();
        var arr = ["tree", "bee", "wee", "yellow", "tree"];
        tree.treeins(arr);

        tree.inorderRec(tree.root);
        console.log(tree.node_count);
        tree.mergesort(tree.nodes, 0, tree.node_count - 1);
    
    }; 

    return AVL;
}());

AVL["__class"] = "AVL";
(function (AVL) {

    var Node = /** @class */ (function () {

        function Node(__parent, item) {

            this.__parent = __parent;

            if (this.key === undefined) {
                this.key = null;
            }
            if (this.left === undefined) {
                this.left = null;
            }
            if (this.right === undefined) {
                this.right = null;
            }

            this.count = 1;
            this.key = item;
            this.left = this.right = null;
        }
        return Node;
    }());

    AVL.Node = Node;
    Node["__class"] = "AVL.Node";

})(AVL || (AVL = {}));
//AVL.main(null);

export default AVL