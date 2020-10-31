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
    public class ProgramacionesController : ControllerBase
    {
        private readonly WebapiDbContext _context;

        public ProgramacionesController(WebapiDbContext context)
        {
            _context = context;
        }

        // GET: api/Programaciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Programacion>>> GetProgramacion()
        {
            return await _context.Programacion.ToListAsync();
        }

        // GET: api/Programaciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Programacion>> GetProgramacion(int id)
        {
            var programacion = await _context.Programacion.FindAsync(id);

            if (programacion == null)
            {
                return NotFound();
            }

            return programacion;
        }

        // PUT: api/Programaciones/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProgramacion(int id, Programacion programacion)
        {
            if (id != programacion.idProgramacion)
            {
                return BadRequest();
            }

            _context.Entry(programacion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProgramacionExists(id))
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

        // POST: api/Programaciones
        [HttpPost]
        public async Task<ActionResult<Programacion>> PostProgramacion(Programacion programacion)
        {
            _context.Programacion.Add(programacion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProgramacion", new { id = programacion.idProgramacion }, programacion);
        }

        // DELETE: api/Programaciones/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Programacion>> DeleteProgramacion(int id)
        {
            var programacion = await _context.Programacion.FindAsync(id);
            if (programacion == null)
            {
                return NotFound();
            }

            _context.Programacion.Remove(programacion);
            await _context.SaveChangesAsync();

            return programacion;
        }

        private bool ProgramacionExists(int id)
        {
            return _context.Programacion.Any(e => e.idProgramacion == id);
        }
    }
}
