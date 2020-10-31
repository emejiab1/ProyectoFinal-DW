using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DEVWEB.Webapi.Contexto;
using DEVWEB.Webapi.Entidades;

namespace DEVWEB.Webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudiantesController : ControllerBase
    {
        private readonly WebapiDbContext _context;

        public EstudiantesController(WebapiDbContext context)
        {
            _context = context;
        }

        // GET: api/Estudiantes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Estudiante>>> GetEstudiante()
        {
            return await _context.Estudiante.ToListAsync();
        }

        // GET: api/Estudiantes/5
        [HttpGet("{id}")]
        public ActionResult<Estudiante> GetEstudiante(string id)
        {
            var estudiante = _context.Estudiante.FirstOrDefault(es => es.usuario_idUsuario == id);

            if (estudiante == null)
            {
                return NotFound();
            }

            return estudiante;
        }

        // PUT: api/Estudiantes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstudiante(int id, Estudiante estudiante)
        {
            if (id != estudiante.idEstudiante)
            {
                return BadRequest();
            }

            _context.Entry(estudiante).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstudianteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Estudiantes
        [HttpPost]
        public ActionResult<Estudiante> PostEstudiante(Estudiante estudiante)
        {
            _context.Estudiante.Add(estudiante);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetEstudiante), new { id = estudiante.idEstudiante }, estudiante);
        }

        // DELETE: api/Estudiantes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Estudiante>> DeleteEstudiante(int id)
        {
            var estudiante = await _context.Estudiante.FindAsync(id);
            if (estudiante == null)
            {
                return NotFound();
            }

            _context.Estudiante.Remove(estudiante);
            await _context.SaveChangesAsync();

            return estudiante;
        }

        private bool EstudianteExists(int id)
        {
            return _context.Estudiante.Any(e => e.idEstudiante == id);
        }
    }
}
