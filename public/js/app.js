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
