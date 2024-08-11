/* eslint-disable */
import {
  BaseVestingAccount,
  Period,
} from "./vestingAccount.js";
import Long from "long";
import _m0 from "protobufjs/minimal.js";

export const protobufPackage = "swisstronik.vesting";

/**
 * MonthlyVestingAccount implements the VestingAccount interface.
 * It continuously vests by unlocking coins after cliff period linear monthly
 * when vesting starts.
 */
export interface MonthlyVestingAccount {
  /**
   * base_vesting_account implements the VestingAccount interface. It contains
   * all the necessary fields needed for any base vesting account implementation
   */
  baseVestingAccount?: BaseVestingAccount;
  /** start_time defines the time at which the vesting period begins */
  startTime: Long;
  /** cliff_time defines the time at which linear monthly vesting starts. */
  cliffTime: Long;
  vestingPeriods: Period[];
}

function createBaseMonthlyVestingAccount(): MonthlyVestingAccount {
  return {
    baseVestingAccount: undefined,
    startTime: Long.ZERO,
    cliffTime: Long.ZERO,
    vestingPeriods: [],
  };
}

export const MonthlyVestingAccount = {
  encode(
    message: MonthlyVestingAccount,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.baseVestingAccount !== undefined) {
      BaseVestingAccount.encode(
        message.baseVestingAccount,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (!message.startTime.isZero()) {
      writer.uint32(16).int64(message.startTime);
    }
    if (!message.cliffTime.isZero()) {
      writer.uint32(24).int64(message.cliffTime);
    }
    for (const v of message.vestingPeriods) {
      Period.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MonthlyVestingAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMonthlyVestingAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseVestingAccount = BaseVestingAccount.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.startTime = reader.int64() as Long;
          break;
        case 3:
          message.cliffTime = reader.int64() as Long;
          break;
        case 4:
          message.vestingPeriods.push(Period.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MonthlyVestingAccount {
    return {
      baseVestingAccount: isSet(object.baseVestingAccount)
        ? BaseVestingAccount.fromJSON(object.baseVestingAccount)
        : undefined,
      startTime: isSet(object.startTime)
        ? Long.fromValue(object.startTime)
        : Long.ZERO,
      cliffTime: isSet(object.cliffTime)
        ? Long.fromValue(object.cliffTime)
        : Long.ZERO,
      vestingPeriods: Array.isArray(object?.vestingPeriods)
        ? object.vestingPeriods.map((e: any) => Period.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MonthlyVestingAccount): unknown {
    const obj: any = {};
    message.baseVestingAccount !== undefined &&
      (obj.baseVestingAccount = message.baseVestingAccount
        ? BaseVestingAccount.toJSON(message.baseVestingAccount)
        : undefined);
    message.startTime !== undefined &&
      (obj.startTime = (message.startTime || Long.ZERO).toString());
    message.cliffTime !== undefined &&
      (obj.cliffTime = (message.cliffTime || Long.ZERO).toString());
    if (message.vestingPeriods) {
      obj.vestingPeriods = message.vestingPeriods.map((e) =>
        e ? Period.toJSON(e) : undefined
      );
    } else {
      obj.vestingPeriods = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MonthlyVestingAccount>, I>>(
    object: I
  ): MonthlyVestingAccount {
    const message = createBaseMonthlyVestingAccount();
    message.baseVestingAccount =
      object.baseVestingAccount !== undefined &&
      object.baseVestingAccount !== null
        ? BaseVestingAccount.fromPartial(object.baseVestingAccount)
        : undefined;
    message.startTime =
      object.startTime !== undefined && object.startTime !== null
        ? Long.fromValue(object.startTime)
        : Long.ZERO;
    message.cliffTime =
      object.cliffTime !== undefined && object.cliffTime !== null
        ? Long.fromValue(object.cliffTime)
        : Long.ZERO;
    message.vestingPeriods =
      object.vestingPeriods?.map((e: any) => Period.fromPartial(e)) || [];
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
