export type AccountStatus = 'all' | 'active' | 'disabled';

export type FiterType = 'all' | 'username' | 'email';

export interface UserData {
  id: number;
  avatar: string;
  userName: string;
  credit: number;
  lastTopup: number;
  createdAt: number;
  status: AccountStatus;
}

export interface AgentData {
  id: number;
  avatar: string;
  userName: string;
  quota: number;
  balance: number;
  duedate: number;
  createdAt: number;
  status: AccountStatus;
}

export interface GameStatisticData{
  id: number;
  avataUrl:string;
  gameName:string;
  winNum:number;
  playerNum:number;
}

export interface FristStatiscData{
  toPyWinNum:number;
  toPyNum:number;
  totalActBotNum:number;
  actUserNum:number;
}

