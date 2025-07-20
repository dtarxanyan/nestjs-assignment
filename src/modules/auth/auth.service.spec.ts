import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let userRepository: UserRepository;

  const mockUser = {
    id: 'user123',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed-password',
  };

  const jwtServiceMock = {
    sign: jest.fn().mockReturnValue('signed-jwt-token'),
  };

  const userRepositoryMock = {
    findByEmail: jest.fn(),
  };

  const bcryptCompareMock = bcrypt.compare as jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: UserRepository, useValue: userRepositoryMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get<UserRepository>(UserRepository);

    jest.clearAllMocks();
    bcryptCompareMock.mockReset();
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      userRepositoryMock.findByEmail.mockResolvedValue(mockUser);
      bcryptCompareMock.mockResolvedValue(true);

      const result = await authService.validateUser(
        mockUser.email,
        'plain-password',
      );

      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(
        mockUser.email,
      );

      expect(result).toEqual({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
      });
    });

    it('should throw NotFoundException if user is not found', async () => {
      userRepositoryMock.findByEmail.mockResolvedValue(null);

      await expect(
        authService.validateUser('nonexistent@example.com', 'password'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      userRepositoryMock.findByEmail.mockResolvedValue(mockUser);
      bcryptCompareMock.mockResolvedValue(false);

      await expect(
        authService.validateUser(mockUser.email, 'wrong-password'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('generateToken', () => {
    it('should call jwtService.sign with user payload and return token', () => {
      const payload = {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
      };

      const token = authService.generateToken(payload);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(jwtService.sign).toHaveBeenCalledWith(payload);
      expect(token).toBe('signed-jwt-token');
    });
  });
});
