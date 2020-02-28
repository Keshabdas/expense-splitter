var app = angular.module("Expense",[]);
app.controller("NumberController", function(){
	this.number_tab=true;
	this.nuser=1;
	this.create_row_tab=false;
	this.grand_table_tab=false;
	this.evaluate_tab= false;
	
	this.reset=function() {
		this.number_tab=true;
		this.create_row_tab=false;
		this.grand_table_tab=false;
		this.evaluate_tab= false;
	
	}

	this.hide_number=function(){
		this.number_tab=false;
		this.create_row_tab=true;
		this.create_row();
	};

	this.create_row=function(){
		this.range=[];
		this.users=[];
		this.amounts=[];
		this.totals=[];
		this.grand_amount=[];

		for(i=0;i<this.nuser;i++){
			this.range.push(i);
			this.users.push(null);
			this.amounts.push(null);
			this.totals.push(0);
			this.grand_amount.push(0);
		};
	};




	this.add_amount=function(i) {		 
		 this.totals[i]+=this.amounts[i];
		 this.amounts[i]=null;
	};

	this.gtotal=function(){
		this.grand_table_tab=true;
		this.grand_total=0;
		this.p_head =0;
		for(i=0;i<this.nuser;i++){
			this.grand_total+=this.totals[i]
		};
	
		this.p_head=(this.grand_total/this.nuser).toFixed(2) ;
		for(i=0;i<this.nuser;i++){
			this.grand_amount[i]=(this.totals[i]-this.p_head).toFixed(2);
		}
	};


	// // REMOVE
	// this.create_row();
	// // this.totals=[7,7,7,8,7,7,8];
	// this.totals=[6,4,5,7,9];
	// this.users=["Biswa","Rahul","Nitish","Lily","Sid","T1","P2"]; 
	// this.gtotal();

	// // REMOVE

	this.solveit=function() {
		this.evaluate_tab =true;
		this.from=[];
		this.to=[];	
		this.amount=[];
		this.a=[]
		this.data=[];
		this.count=0;



		for(i=0;i<this.nuser;i++){
			this.a.push(parseFloat(this.grand_amount[i]))
		}
		console.log(this.a);

		this.solve_expesne();
	}

	this.solve_expesne=function(){
		 a=this.a;
		for(i=0;i<this.nuser;i++){
			if(a[i]<0){
				for(j=0;j<this.nuser;j++){
					key =a[j];
					if(key>0 && a[i]!=0){
						t= (a[j])+ (a[i])
						console.log("T:"+ t)
						if(t>0){
							console.log(a[j]+"-->"+a[i])
							console.log(this.users[i]+"-->"+this.users[j]+":"+this.a[i])
							// ADding to Object 
							this.count=this.count+1;
							 var obs = {
							 	c:this.count,
							 	f:this.users[i],
							 	t:this.users[j],
							 	a:(Math.abs(this.a[i])).toFixed(2) 
							 }

							this.data.push(obs);
							// ENDS HER ADDING TO OBJECT 
							this.from.push(this.users[i])
							this.to.push(this.users[j])
							this.amount.push((Math.abs(this.a[i])).toFixed(2))
							a[i]=0;
							a[j]=t;
						}
						else{
							console.log(a[i]+"-->"+a[j])
							console.log(this.users[i]+"-->"+this.users[j]+":"+this.a[j])

							this.count=this.count+1;
							var obs = {
								c:this.count,
							 	f:this.users[i],
							 	t:this.users[j],
							 	a:Math.abs(this.a[j]).toFixed(2),
							 }

							this.data.push(obs);

							this.from.push(this.users[i])
							this.to.push(this.users[j])
							this.amount.push((this.a[j]).toFixed(2))
							a[i]=t;
							a[j]=0;
						}
					}
				}
			}
		};
	};



});



