const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema ({
	name: {
		type: String,
		require:true
	},
	message:{
		type:String,
		require:true
	}


})
const requests = mongoose.model('Request',requestSchema)
	module.exports = requests