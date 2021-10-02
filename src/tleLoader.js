let data = []
export async function loadTLE(){
	// await fetchDataSync(0,0)
	console.log("done", data)
}

async function getMaxElements(){
	let fetchResult = await fetch("https://tle.ivanstanojevic.me/api/tle");
	let result = await fetchResult.json();

}

async function fetchDataSync (page, fetchCount = 0){
	let fetchResult = await fetch("https://tle.ivanstanojevic.me/api/tle/?page=1")
	if (!fetchResult || fetchResult.status != 200) { 
		await fetchDataSync(page, fetchCount + 1);
	};
	let result = await fetchResult.json();
	console.log(result)
	let members = result.member || [];
	if (members) data = data.concat(members)
	console.log(data)
	let view = result.view;
	let next = view.next;
	if (next) await fetchDataSync(page+1, 0)
}