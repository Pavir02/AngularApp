using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            this._context = context;
        }


        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if( await UserExists(registerDto.UserName)) return BadRequest("Username taken");

            using var hmac = new HMACSHA512();

            var user = new AppUser{
                UserName = registerDto.UserName,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
             await _context.SaveChangesAsync();
             
            var userDto = new UserDto{
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };

             return userDto;
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName.ToLower() == loginDto.UserName.ToLower());

            if(user == null) return Unauthorized("Invalid Username");

            var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            
            for(int i = 0;  i<computedHash.Length ; i++ )
            {
            if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");         
            }

            var userDto = new UserDto{
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
            return userDto;
        }

        private async Task<bool> UserExists(string userName)
        {
            return await _context.Users.AnyAsync(x=> (x.UserName.ToLower() == userName.ToLower()));
        }
    }
}