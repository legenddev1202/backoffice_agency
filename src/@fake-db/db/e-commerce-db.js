import _ from '@lodash';
import mock from '../mock';
import { db, realDb } from './firebase';

const eCommerceDB = {
	entrys: []
};

var belongTo = localStorage.getItem('@BELONGTO');

mock.onGet('/api/e-commerce-app/products').reply(
	() =>
		new Promise((resolve, reject) => {
			var year = new Date().getFullYear();
			var starCountRef = realDb.ref(`Sales/Entries/${year}/`);
			starCountRef.on('value', snapshot => {
				const data = snapshot.val();

				Object.keys(data).map(item => {
					eCommerceDB.entrys.push(data[item]);
				});
				console.log(eCommerceDB.entrys);
				resolve(eCommerceDB.entrys);
			});
		})
);

mock.onPost('/api/e-commerce-app/remove-products').reply(request => {
	const { productIds } = JSON.parse(request.data);
	eCommerceDB.entrys = eCommerceDB.entrys.filter(product => !productIds.includes(product.id));
	return [200, productIds];
});

mock.onGet('/api/e-commerce-app/product').reply(request => {
	const { productId } = request.params;
	const response = _.find(eCommerceDB.entrys, { id: productId });
	return [200, response];
});

mock.onPost('/api/e-commerce-app/product/save').reply(async request => {
	let data = JSON.parse(request.data);
	let product = null;
	let uid = localStorage.getItem('@UID');
	eCommerceDB.entrys = eCommerceDB.entrys.map(_product => {
		if (_product.id === data.id) {
			product = data;
			return product;
		}
		return _product;
	});

	if (!product) {
		product = data;
		eCommerceDB.entrys = [...eCommerceDB.entrys, product];
	}
	data.map(item => {
		if (item.user) {
			uid = item.user.uid;
		}
		data = { ...item, sellerId: item.uid };
		var id = Date.now();
		var year = new Date().getFullYear();
		console.log(
			`Sales/${year}/${item.belongTo}/${item.policyType[0]}/${
				item.user === 'OfficeCount' ? `OfficeCount` : item.user ? item.user.uid : data.sellerId
			}/${id}`
		);
		realDb
			.ref(
				`Sales/${year}/${item.belongTo}/${item.policyType[0]}/${
					item.user === 'OfficeCount' ? `OfficeCount` : item.user ? item.user.uid : data.sellerId
				}/${id}`
			)
			.set({
				...data,
				id: id
			});
	});
	return [200, product];
});

mock.onPost('/api/e-commerce-app/product/multi-auto-save').reply(async request => {
	let data = JSON.parse(request.data);
	let product = null;
	let uid = localStorage.getItem('@UID');
	eCommerceDB.entrys = eCommerceDB.entrys.map(_product => {
		if (_product.id === data.id) {
			product = data;
			return product;
		}
		return _product;
	});

	if (!product) {
		product = data;
		eCommerceDB.entrys = [...eCommerceDB.entrys, product];
	}
	data.map(item => {
		if (item.user) {
			uid = item.user.uid;
		}
		data = { ...item, sellerId: item.uid };
		var id = Date.now();
		var year = new Date().getFullYear();
		console.log(
			`Sales/${year}/${item.belongTo}/${item.policyType[0]}/${
				item.user === 'OfficeCount' ? `OfficeCount` : item.user ? item.user.uid : data.sellerId
			}/${id}`
		);
		if (item.policyType[0] !== undefined)
			realDb
				.ref(
					`Sales/${year}/${item.belongTo}/${item.policyType[0]}/${
						item.user === 'OfficeCount' ? `OfficeCount` : item.user ? item.user.uid : data.sellerId
					}/${id}`
				)
				.set({
					...data,
					id: id
				});
	});
	return [200, product];
});

mock.onPost('/api/e-commerce-app/product/update').reply(async request => {
	let data = JSON.parse(request.data);
	let product = null;
	let uid = localStorage.getItem('@UID');
	var year = new Date().getFullYear();
	eCommerceDB.entrys = eCommerceDB.entrys.map(_product => {
		if (_product.id === data.id) {
			product = data;
			return product;
		}
		return _product;
	});

	if (!product) {
		product = data;
		eCommerceDB.entrys = [...eCommerceDB.entrys, product];
	}

	data = { ...data[0], sellerId: uid };

	if (data.user) {
		uid = data.user.uid;
	}
	if (data.policyType !== undefined)
		realDb
			.ref(
				`Sales/${year}/${belongTo}/${data.policyType}/${data.user === 'OfficeCount' ? `OfficeCount` : uid}/${
					data.id
				}`
			)
			.set({
				...data
			});

	return [200, product];
});
