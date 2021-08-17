import { Request, Response } from 'express';
import Clinic from '../entities/Clinic';
import Vote from '../entities/Vote';
const requestIp = require('request-ip');

// VOTING
export const vote = async (req: Request, res: Response) => {
  const clientIp = requestIp.getClientIp(req);
  const ip_address: string = clientIp;
  const { id, value } = req.body;

  // Validate vote values  -1, 0, -1
  if (![-1, 0, 1].includes(value)) {
    return res.status(400).json({ value: 'Value must be -1, 0, or 1' });
  }

  try {
    let clinic: Clinic = await Clinic.findOneOrFail(id, {
      relations: ['votes'],
    });

    let vote: Vote | undefined;
    let isMatch;

    // if this ip address already voted
    const isVoted = clinic.votes.filter((vot) => {
      return vot.ip_address === ip_address;
    });

    if (isVoted.length > 0) {
      vote = isVoted[0];
    } else {
      vote = undefined;
    }

    // if the value is the same
    if (vote?.value === value) {
      isMatch = true;
    } else {
      isMatch = false;
    }

    // if tno vote and value is 0
    if (!vote && value === 0) {
      return res.status(404).json({ error: 'Vote not found' });
    }

    // if there is no vote and we get a value ==> create a new vote
    if (!vote && (value === 1 || value === -1)) {
      const vote = new Vote({ ip_address, value });
      clinic.votes.push(vote);
      await vote.save();
    }

    // if there is a vote but with mismatched values
    if (vote && !isMatch) {
      clinic.votes = clinic.votes.filter((vot) => {
        return vot.ip_address !== ip_address;
      });
      const thisVote = await Vote.findOneOrFail({ ip_address });
      await thisVote.remove();

      const newVote = new Vote({ ip_address, value });
      await newVote.save();
      clinic.votes.push(newVote);
      await vote.save();
    }

    // if there is a vote but value is 0 ==> remove vote
    if ((vote && value === 0) || (vote && isMatch)) {
      clinic.votes = clinic.votes.filter((vot) => {
        return vot.ip_address !== ip_address;
      });
      // const thisVote = await Vote.findOneOrFail({ ip_address });
      // await thisVote.remove();
    }

    await clinic.save();
    clinic = await Clinic.findOneOrFail(id, { relations: ['votes'] });

    return res.json(clinic);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// FIND SELF
export const findSelf = async (req: Request, res: Response) => {
  const clientIp = requestIp.getClientIp(req);


  try {
    return res.status(200).json(clientIp);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
