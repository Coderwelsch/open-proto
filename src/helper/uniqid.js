let pid = process && process.pid ? process.pid.toString(36) : "";
let address = "";
if(typeof __webpack_require__ !== 'function'){
	let mac = "", networkInterfaces = require("os").networkInterfaces();
	for(let interface_key in networkInterfaces){
		const networkInterface = networkInterfaces[interface_key];
		const length = networkInterface.length;
		for(let i = 0; i < length; i++){
			if(networkInterface[i].mac && networkInterface[i].mac !== '00:00:00:00:00:00'){
				mac = networkInterface[i].mac; break;
			}
		}
	}
	address = mac ? parseInt(mac.replace(/:|\D+/gi, '')).toString(36) : '' ;
}

//  Exports
// ================================================
module.exports = module.exports.default = function(prefix, suffix){ return (prefix ? prefix : '') + address + pid + now().toString(36) + (suffix ? suffix : ''); }
module.exports.process = function(prefix, suffix){ return (prefix ? prefix : '') + pid + now().toString(36) + (suffix ? suffix : ''); }
module.exports.time    = function(prefix, suffix){ return (prefix ? prefix : '') + now().toString(36) + (suffix ? suffix : ''); }

//  Helpers
// ================================================
function now(){
	const time = Date.now();
	const last = now.last || time;
	return now.last = time > last ? time : last + 1;
}