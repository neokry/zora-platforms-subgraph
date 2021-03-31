import { BigInt } from "@graphprotocol/graph-ts";
import {
  Contract,
  OwnerChanged,
  PlatformCreated,
  TokenAdded,
} from "../generated/Contract/Contract";
import { Platform, Token } from "../generated/schema";

export function handleOwnerChanged(event: OwnerChanged): void {
  let entity = Platform.load(event.params.platformId.toHex());

  entity.owner = event.params.newOwner;
  entity.save();
}

export function handlePlatformCreated(event: PlatformCreated): void {
  let entity = Platform.load(event.params.platformId.toHex());

  if (entity == null) {
    entity = new Platform(event.params.platformId.toHex());
  }

  entity.name = event.params.name;
  entity.owner = event.params.creator;
  entity.save();
}

export function handleTokenAdded(event: TokenAdded): void {
  let entity = Platform.load(event.params.platformId.toHex());

  let token = new Token(event.params.tokenId.toHex());
  token.created = event.params.timestamp;
  entity.tokens.push(token.id);

  token.save();
  entity.save();
}
