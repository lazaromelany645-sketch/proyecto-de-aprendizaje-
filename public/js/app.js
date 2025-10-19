<<<<<<< HEAD
const API = { clientes: '/api/clientes', mascotas: '/api/mascotas', vets: '/api/veterinarios', citas: '/api/citas' };
function $(id){return document.getElementById(id);} 
async function fetchJson(url, opts){ const res = await fetch(url, opts); if(!res.ok) throw new Error('Error '+res.status); return res.json(); }
function renderRows(tableId, list, mapper){ const tbody = $(tableId).querySelector('tbody'); tbody.innerHTML = list.map(mapper).join(''); }
async function loadAll(){ try{ const [clientes, mascotas, vets, citas] = await Promise.all([fetchJson(API.clientes), fetchJson(API.mascotas), fetchJson(API.vets), fetchJson(API.citas)]); window._clientes = clientes; window._mascotas = mascotas; window._vets = vets; window._citas = citas; renderClientes(clientes); renderMascotas(mascotas); renderVets(vets); renderCitas(citas); fillClienteSelects(clientes); $('cita_vet').innerHTML = '<option value="">Seleccione</option>' + vets.map(v=>`<option value="${v.id}">${v.nombre}</option>`).join(''); }catch(e){ console.error(e); }}
function renderClientes(list){ renderRows('tablaClientes', list, (c,i)=>`<tr><td>${i+1}</td><td>${c.nombre}</td><td>${c.telefono||''}</td><td>${c.correo||''}</td><td><button class="btn btn-sm btn-success" onclick="editCliente(${c.id})">Editar</button> <button class="btn btn-sm btn-danger" onclick="delCliente(${c.id})">Eliminar</button></td></tr>`); }
function renderMascotas(list){ renderRows('tablaMascotas', list, (m,i)=>`<tr><td>${i+1}</td><td>${m.nombre}</td><td>${m.especie}</td><td>${m.raza||''}</td><td>${m.edad||''}</td><td>${m.cliente||''}</td><td><button class="btn btn-sm btn-success" onclick="editMascota(${m.id})">Editar</button> <button class="btn btn-sm btn-danger" onclick="delMascota(${m.id})">Eliminar</button></td></tr>`); }
function renderVets(list){ renderRows('tablaVets', list, (v,i)=>`<tr><td>${i+1}</td><td>${v.nombre}</td><td>${v.especialidad||''}</td><td><button class="btn btn-sm btn-success" onclick="editVet(${v.id})">Editar</button> <button class="btn btn-sm btn-danger" onclick="delVet(${v.id})">Eliminar</button></td></tr>`); }
function renderCitas(list){ renderRows('tablaCitas', list, (c,i)=>`<tr><td>${i+1}</td><td>${c.fecha}</td><td>${c.hora}</td><td>${c.mascota||''}</td><td>${c.especie||''}</td><td>${c.cliente||''}</td><td>${c.veterinario||''}</td><td>${c.motivo||''}</td><td><button class="btn btn-sm btn-success" onclick="editCita(${c.id})">Editar</button> <button class="btn btn-sm btn-danger" onclick="delCita(${c.id})">Eliminar</button></td></tr>`); }
function fillClienteSelects(clientes){ const opts = '<option value="">Seleccione</option>' + clientes.map(c=>`<option value="${c.id}">${c.nombre}</option>`).join(''); $('cita_cliente').innerHTML = opts; $('mascota_cliente').innerHTML = opts; $('filtroClienteMas').innerHTML = '<option value="">Filtrar por cliente</option>' + clientes.map(c=>`<option value="${c.id}">${c.nombre}</option>`).join(''); }
$('btnAddCliente').addEventListener('click', ()=>{ $('cliente_id').value=''; $('cliente_nombre').value=''; $('cliente_telefono').value=''; $('cliente_correo').value=''; new bootstrap.Modal($('modalCliente')).show(); });
$('saveCliente').addEventListener('click', async ()=>{ const id = $('cliente_id').value; const payload = { nombre: $('cliente_nombre').value, telefono: $('cliente_telefono').value, correo: $('cliente_correo').value }; try{ if(id){ await fetchJson(API.clientes+'/'+id, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) }); } else { await fetchJson(API.clientes, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) }); } new bootstrap.Modal($('modalCliente')).hide(); await loadAll(); }catch(e){ alert('Error guardando cliente'); } });
window.editCliente = async (id)=>{ const c = window._clientes.find(x=>x.id==id); if(!c) return; $('cliente_id').value=c.id; $('cliente_nombre').value=c.nombre; $('cliente_telefono').value=c.telefono; $('cliente_correo').value=c.correo; new bootstrap.Modal($('modalCliente')).show(); }
window.delCliente = async (id)=>{ if(!confirm('Eliminar cliente?')) return; await fetchJson(API.clientes+'/'+id, { method:'DELETE' }); await loadAll(); }
$('btnAddMascota').addEventListener('click', ()=>{ $('mascota_id').value=''; $('mascota_nombre').value=''; $('mascota_especie').value=''; $('mascota_raza').value=''; $('mascota_edad').value=''; new bootstrap.Modal($('modalMascota')).show(); });
$('saveMascota').addEventListener('click', async ()=>{ const id = $('mascota_id').value; const payload = { nombre:$('mascota_nombre').value, especie:$('mascota_especie').value, raza:$('mascota_raza').value, edad: parseInt($('mascota_edad').value)||0, id_cliente: $('mascota_cliente').value }; try{ if(id){ await fetchJson(API.mascotas+'/'+id, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) }); } else { await fetchJson(API.mascotas, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) }); } new bootstrap.Modal($('modalMascota')).hide(); await loadAll(); }catch(e){ alert('Error guardando mascota'); } });
window.editMascota = async (id)=>{ const m = window._mascotas.find(x=>x.id==id); if(!m) return; $('mascota_id').value=m.id; $('mascota_nombre').value=m.nombre; $('mascota_especie').value=m.especie; $('mascota_raza').value=m.raza; $('mascota_edad').value=m.edad; $('mascota_cliente').value=m.id_cliente; new bootstrap.Modal($('modalMascota')).show(); }
window.delMascota = async (id)=>{ if(!confirm('Eliminar mascota?')) return; await fetchJson(API.mascotas+'/'+id, { method:'DELETE' }); await loadAll(); }
$('btnAddVet').addEventListener('click', ()=>{ $('vet_id').value=''; $('vet_nombre').value=''; $('vet_especialidad').value=''; new bootstrap.Modal($('modalVet')).show(); });
$('saveVet').addEventListener('click', async ()=>{ const id=$('vet_id').value; const payload={ nombre:$('vet_nombre').value, especialidad:$('vet_especialidad').value }; try{ if(id){ await fetchJson(API.vets+'/'+id, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) }); } else { await fetchJson(API.vets, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) }); } new bootstrap.Modal($('modalVet')).hide(); await loadAll(); }catch(e){ alert('Error guardando veterinario'); } });
window.editVet = async (id)=>{ const v = window._vets.find(x=>x.id==id); if(!v) return; $('vet_id').value=v.id; $('vet_nombre').value=v.nombre; $('vet_especialidad').value=v.especialidad; new bootstrap.Modal($('modalVet')).show(); }
window.delVet = async (id)=>{ if(!confirm('Eliminar veterinario?')) return; await fetchJson(API.vets+'/'+id, { method:'DELETE' }); await loadAll(); }
$('btnAddCita').addEventListener('click', ()=>{ $('cita_id').value=''; $('cita_fecha').value=''; $('cita_hora').value=''; $('cita_motivo').value=''; $('cita_especie').value=''; $('cita_cliente').value=''; $('cita_mascota').innerHTML=''; $('cita_vet').value=''; new bootstrap.Modal($('modalCita')).show(); });
$('cita_cliente').addEventListener('change', async (e)=>{ const id = e.target.value; $('cita_mascota').innerHTML = '<option value="">Cargando...</option>'; if(!id) { $('cita_mascota').innerHTML=''; $('cita_especie').value=''; return; } const pets = await fetchJson(API.mascotas+'/cliente/'+id); $('cita_mascota').innerHTML = '<option value="">Seleccione</option>' + pets.map(p=>`<option value="${p.id}" data-especie="${p.especie}">${p.nombre} (${p.especie})</option>`).join(''); });
$('cita_mascota').addEventListener('change', (e)=>{ const opt = e.target.selectedOptions[0]; $('cita_especie').value = opt ? opt.dataset.especie || '' : ''; });
$('saveCita').addEventListener('click', async ()=>{ const id = $('cita_id').value; const payload = { fecha:$('cita_fecha').value, hora:$('cita_hora').value, motivo:$('cita_motivo').value, id_mascota: $('cita_mascota').value, id_veterinario: $('cita_vet').value }; try{ if(id){ await fetchJson(API.citas+'/'+id, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) }); } else { await fetchJson(API.citas, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) }); } new bootstrap.Modal($('modalCita')).hide(); await loadAll(); }catch(e){ alert('Error guardando cita'); } });
window.editCita = async (id)=>{ const c = window._citas.find(x=>x.id==id); if(!c) return; $('cita_id').value=c.id; $('cita_fecha').value=c.fecha; $('cita_hora').value=c.hora; $('cita_motivo').value=c.motivo; const pet = window._mascotas.find(m=>m.id==c.id_mascota) || {}; if(pet.id_cliente){ $('cita_cliente').value=pet.id_cliente; const pets = await fetchJson(API.mascotas+'/cliente/'+pet.id_cliente); $('cita_mascota').innerHTML = '<option value="">Seleccione</option>' + pets.map(p=>`<option value="${p.id}" data-especie="${p.especie}" ${p.id==c.id_mascota? 'selected':''}>${p.nombre} (${p.especie})</option>`).join(''); $('cita_especie').value = (pets.find(p=>p.id==c.id_mascota)||{}).especie || ''; } $('cita_vet').value = c.id_veterinario || ''; new bootstrap.Modal($('modalCita')).show(); };
window.delCita = async (id)=>{ if(!confirm('Eliminar cita?')) return; await fetchJson(API.citas+'/'+id, { method:'DELETE' }); await loadAll(); }
$('filtroClienteMas').addEventListener('change', async (e)=>{ const id = e.target.value; if(!id){ renderMascotas(window._mascotas); return; } const list = window._mascotas.filter(m=>m.id_cliente==id); renderMascotas(list); });
window.addEventListener('DOMContentLoaded', ()=> loadAll());
=======
const api = {
  categorias: '/api/categorias',
  subcategorias: '/api/subcategorias',
  docentes: '/api/docentes',
  cursos: '/api/cursos'
};

function showAlert(type, message) {
  const el = document.getElementById('alerts');
  el.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  setTimeout(()=> { const a = el.querySelector('.alert'); if(a) a.classList.remove('show'); }, 4000);
}

async function fetchJson(url, opts) {
  const res = await fetch(url, opts);
  if(!res.ok) throw new Error('Error en la petición ' + res.status);
  return res.json();
}

async function cargarCategorias() {
  const cats = await fetchJson(api.categorias);
  const sel = document.getElementById('categoria');
  sel.innerHTML = '<option value="">Selecciona</option>' + cats.map(c=>`<option value="${c.id}">${c.nombre}</option>`).join('');
}

async function cargarSubcategorias() {
  const subs = await fetchJson(api.subcategorias);
  window._subcategorias = subs;
  const sel = document.getElementById('subcategoria');
  sel.innerHTML = '<option value="">Selecciona</option>';
}

function filtrarSubcategorias(idCategoria) {
  const sel = document.getElementById('subcategoria');
  const list = (window._subcategorias || []).filter(s => s.id_categoria == idCategoria);
  sel.innerHTML = '<option value="">Selecciona</option>' + list.map(s=>`<option value="${s.id}">${s.nombre}</option>`).join('');
}

async function cargarCursos() {
  const cursos = await fetchJson(api.cursos);
  window._cursos = cursos;
  renderTablaCursos();
}

function filtrarCursos(idSubcategoria) {
  const sel = document.getElementById('curso');
  const list = (window._cursos || []).filter(c => c.id_subcategoria == idSubcategoria);
  sel.innerHTML = '<option value="">(ninguno)</option>' + list.map(c=>`<option value="${c.id}">${c.titulo}</option>`).join('');
}

async function cargarDocentes() {
  const docs = await fetchJson(api.docentes);
  const sel = document.getElementById('docente');
  sel.innerHTML = '<option value="">Selecciona</option>' + docs.map(d=>`<option value="${d.id}">${d.nombre}</option>`).join('');
}

function renderTablaCursos() {
  const tbody = document.querySelector('#tablaCursos tbody');
  const rows = (window._cursos || []).map((c,i)=>`
    <tr>
      <td>${i+1}</td>
      <td>${c.titulo}</td>
      <td>${c.subcategoria || ''}</td>
      <td>${c.docente || ''}</td>
      <td>${c.duracion_horas || ''}</td>
      <td>${c.precio || ''}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary" onclick="editarCurso(${c.id})">Editar</button>
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarCurso(${c.id})">Eliminar</button>
      </td>
    </tr>
  `).join('');
  tbody.innerHTML = rows;
}

async function init() {
  try {
    await Promise.all([cargarCategorias(), cargarSubcategorias(), cargarDocentes(), cargarCursos()]);
  } catch (e) {
    console.error(e);
    showAlert('danger', 'Error cargando datos: ' + e.message);
  }
}

document.getElementById('categoria').addEventListener('change', (e)=> {
  filtrarSubcategorias(e.target.value);
  document.getElementById('curso').innerHTML = '<option value="">(ninguno)</option>';
});

document.getElementById('subcategoria').addEventListener('change', (e)=> {
  filtrarCursos(e.target.value);
});

document.getElementById('formCurso').addEventListener('submit', async (ev)=> {
  ev.preventDefault();
  // check if editing
  const btn = document.getElementById('btnSubmit');
  const editId = btn.dataset.editId;
  const payload = {
    titulo: document.getElementById('titulo').value,
    descripcion: document.getElementById('descripcion').value,
    fecha_inicio: document.getElementById('fecha_inicio').value,
    fecha_fin: document.getElementById('fecha_fin').value,
    duracion_horas: parseInt(document.getElementById('duracion').value) || null,
    precio: parseFloat(document.getElementById('precio').value) || null,
    id_subcategoria: document.getElementById('subcategoria').value || null,
    id_docente: document.getElementById('docente').value || null
  };
  try {
    if(editId) {
      await fetchJson(api.cursos + '/' + editId, { method: 'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
      showAlert('success','Curso actualizado');
      btn.textContent = 'Registrar Curso';
      delete btn.dataset.editId;
    } else {
      await fetchJson(api.cursos, { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
      showAlert('success','Curso registrado correctamente');
    }
    await cargarCursos();
    // reset form
    document.getElementById('formCurso').reset();
  } catch(e) { console.error(e); showAlert('danger','Error: '+e.message); }
});

window.editarCurso = async function(id) {
  const curso = (window._cursos || []).find(c=>c.id==id);
  if(!curso) return showAlert('warning','Curso no encontrado');
  document.getElementById('titulo').value = curso.titulo;
  document.getElementById('descripcion').value = curso.descripcion || '';
  document.getElementById('fecha_inicio').value = curso.fecha_inicio || '';
  document.getElementById('fecha_fin').value = curso.fecha_fin || '';
  document.getElementById('duracion').value = curso.duracion_horas || '';
  document.getElementById('precio').value = curso.precio || '';
  document.getElementById('categoria').value = curso.id_subcategoria ? (window._subcategorias.find(s=>s.id==curso.id_subcategoria)||{}).id_categoria||'' : '';
  filtrarSubcategorias(document.getElementById('categoria').value);
  document.getElementById('subcategoria').value = curso.id_subcategoria || '';
  filtrarCursos(curso.id_subcategoria);
  document.getElementById('curso').value = curso.id || '';
  document.getElementById('docente').value = curso.id_docente || '';
  const btn = document.getElementById('btnSubmit');
  btn.textContent = 'Actualizar Curso';
  btn.dataset.editId = id;
};

window.eliminarCurso = async function(id) {
  if(!confirm('¿Eliminar este curso?')) return;
  try {
    await fetchJson(api.cursos + '/' + id, { method: 'DELETE' });
    showAlert('success','Curso eliminado');
    await cargarCursos();
  } catch(e) { console.error(e); showAlert('danger','Error: '+e.message); }
};

// initial load
init();
>>>>>>> 8dd17250913ad1033eec85766e23d0eeebb7adb3
