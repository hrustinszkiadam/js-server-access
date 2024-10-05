import './style.css';
import Access from './Access';
import { fetchData, isValidIPv4, postData } from './fetchData';

const URL = 'https://retoolapi.dev/IVuR6b/data';
const container = document.getElementById('container');
const header = document.getElementById('header');
const rowTemplate = document.getElementById('row-template');
const ascArrowTemplate = document.getElementById('asc-arrow');
const descArrowTemplate = document.getElementById('desc-arrow');
const newForm = document.getElementById('new-form');

const refresh = () => {
	while (container.children.length > 1) {
		container.removeChild(container.lastChild);
	}
	document.querySelectorAll('.order-arrow').forEach((arrow) => {
		arrow.remove();
	});
	Access.sortList();
	Access.accessList.forEach((access) => {
		const clone = rowTemplate.content.cloneNode(true);
		const cols = clone.querySelectorAll('.col');
		cols[0].textContent = access.name;
		cols[1].textContent = access.ip;
		cols[2].textContent = access.access_time.toLocaleString();
		container.appendChild(clone);
	});
	const arrow =
		Access.sorting_order === 'asc'
			? ascArrowTemplate.content.cloneNode(true)
			: descArrowTemplate.content.cloneNode(true);
	header.querySelector(`#${Access.sorting}`).prepend(arrow);
};

const getData = async () => {
	Access.createList(await fetchData(URL));
	refresh();
};

document
	.querySelector('#new-button')
	.addEventListener('click', () => newForm.classList.toggle('hidden'));

header.addEventListener('click', (e) => {
	if (!e.target.id || e.target.id === 'header') return;

	Access.changeSorting(e.target.id);
	console.log(e.target.id);
	refresh();
});

newForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const octet1 = Number(e.target.querySelector('#new-ip-1').value);
    const octet2 = Number(e.target.querySelector('#new-ip-2').value);
    const octet3 = Number(e.target.querySelector('#new-ip-3').value);
    const octet4 = Number(e.target.querySelector('#new-ip-4').value);
    if (!isValidIPv4(octet1, octet2, octet3, octet4)) {
        alert('Hibás IP cím!');
        return;
    }

    let name = e.target.querySelector('#new-name').value;
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const data = {
        name: name,
        ip: `${octet1}.${octet2}.${octet3}.${octet4}`,
        access_time: e.target.querySelector('#new-access_time').value,
    };

    await postData(URL, data);
    await getData();
    newForm.classList.add('hidden');
    e.target.reset();
    alert('Új adat sikeresen felvéve!');
});

await getData();

setInterval(async () => {
	await getData();
}, 60000);
