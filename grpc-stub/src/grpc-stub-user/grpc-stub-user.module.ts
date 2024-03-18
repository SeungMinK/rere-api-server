import { DynamicModule, Module } from '@nestjs/common'
import { USER_PACKAGE_NAME } from '@grpc-idl/proto/user'
import { GrpcStubUserService } from './grpc-stub-user.service'
import {
  createGrpcStubClientFactory,
  createGrpcStubOptionsProvider,
  GrpcStubModuleAsyncOptions,
} from '@client/client-grpc-stub/grpc-stub-dynamic-module'

const GRPC_STUB_PROVIDER_NAME = 'GRPC_STUB_USER'
const PACKAGE_NAME = [USER_PACKAGE_NAME]
const PROTO_FILE_NAME = ['user.proto']
const SERVICES = [GrpcStubUserService]

@Module({})
export class GrpcStubUserModule {
  static registerAsync(options: GrpcStubModuleAsyncOptions): DynamicModule {
    const grpcStubFactory = createGrpcStubClientFactory(GRPC_STUB_PROVIDER_NAME, PACKAGE_NAME, PROTO_FILE_NAME)

    return {
      global: true,
      module: GrpcStubUserModule,
      providers: [grpcStubFactory, createGrpcStubOptionsProvider(options), ...SERVICES],
      exports: [grpcStubFactory, ...SERVICES],
    }
  }
}
