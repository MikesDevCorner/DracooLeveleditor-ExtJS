Ext.define('XSG.store.MotionEquationStore', {
    extend: 'Ext.data.Store',
    fields: [
		{name: 'name',  type: 'string'}
	],
	data: [
        {name: 'quad.inout'},
        {name: 'quad.in'},
		{name: 'quad.out'},
		{name: 'elastic.in'},
		{name: 'elastic.out'},
		{name: 'elastic.inout'},
		{name: 'cubic.in'},
		{name: 'cubic.out'},
		{name: 'cubic.inout'},
		{name: 'sine.in'},
		{name: 'sine.out'},
		{name: 'sine.inout'},
		{name: 'circ.in'},
		{name: 'circ.out'},
		{name: 'circ.inout'},
		{name: 'back.in'},
		{name: 'back.out'},
		{name: 'back.inout'},
		{name: 'expo.in'},
		{name: 'expo.out'},
		{name: 'expo.inout'},
		{name: 'quart.in'},
		{name: 'quart.out'},
		{name: 'quart.inout'},
		{name: 'quint.in'},
		{name: 'quint.out'},
		{name: 'quint.inout'},
		{name: 'linear.inout'}
    ]
});