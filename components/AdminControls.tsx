import React from 'react'
import {
    StarIcon,
    CurrencyDollarIcon,
    ArrowPathIcon,
    ArrowUturnDownIcon,
} from "@heroicons/react/24/solid"
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react'
import { ethers } from 'ethers';
import { currency } from '@/constants';
import { toast } from 'react-hot-toast';

const AdminControls = () => {

    const { contract, isLoading } = useContract(
        "0xCA4b91F7d2B816ee0F5160957dD94B5CC32469A1"
    );

    const { data: totalCommission } = useContractRead(
        contract,
        "operatorTotalCommision"
    );

    const { mutateAsync: DrawWinnerTicket } = useContractWrite(
        contract,
        "DrawWinnerTicket"
    );

    const { mutateAsync: RefundAll } = useContractWrite(
        contract,
        "RefundAll"
    );

    const { mutateAsync: restartDraw } = useContractWrite(
        contract,
        "restartDraw"
    );

    const { mutateAsync: WithdrawCommission } = useContractWrite(
        contract,
        "WithdrawCommission"
    );

    const drawWinner = async () => {
        const notification = toast.loading("Picking a Lucky winner...");

        try{
            const data = await DrawWinnerTicket({ args: [{}] });

            toast.success("A Winner has been selected!", {
                id: notification,
            });
            console.info("contract call success", data);
        }catch (err) {
            toast.error("Whoops something went wrong!", {
                id: notification,
            });

            console.error("contract call failure", err);
        }
    }

    const onWithdrawWinnings = async () => {
        const notification = toast.loading("Withdrawing comission...");

        try {
            const data = await WithdrawCommission({ args: [{}]});

            toast.success("Your Commission has been withdrawn successfully!", {
                id: notification,
            });
            console.info("contract call success", data);
        } catch (err) {
            toast.error("Whoops something went wrong!", {
                id: notification,
            });

            console.error("Contract call failure", err);
        }
    }

    const onRestartDraw = async () => {
        const notification = toast.loading("Restarting draw...");

        try {
            const data = await restartDraw({ args: [{}]});

            toast.success("Draw restarted successfully!", {
                id: notification,
            });
            console.info("contract call success", data);
        } catch (err) {
            toast.error("Whoops something went wrong!", {
                id: notification,
            });

            console.error("contract call failure", err);
        }
    }

    const onRefundAll = async () => {
        const notification = toast.loading("Refunding all...");

        try {
            const data = await RefundAll({ args: [{}]});

            toast.success("All refunded successfully!", {
                id: notification,
            });
            console.info("contract call success", data);
        } catch (err) {
            toast.error("Whoops something went wrong!", {
                id: notification,
            });

            console.error("contract call failure", err);
        }
    };

  return (
    <div className="text-white text-center px-5 py-3 rounded-md border-emerald-300/20 border">
        <h2 className="font-bold">Admin Controls</h2>
        <p className="mb-5">Total Commission to be Withdrawn: {" "} 
            {totalCommission && ethers.utils.formatEther(totalCommission?.toString())}{" "}
            {currency}
        </p>

        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <button onClick={drawWinner} className="admin-button">
                <StarIcon className="h-6 mx-auto mb-2" />
                Draw Winner
            </button>
            <button onClick={onWithdrawWinnings} className="admin-button">
                <CurrencyDollarIcon className="h-6 mx-auto mb-2" />
                Withdraw Commission
            </button>
            <button onClick={onRestartDraw} className="admin-button">
                <ArrowPathIcon className="h-6 mx-auto mb-2" />
                Restart Draw
            </button>
            <button onClick={onRefundAll} className="admin-button">
                <ArrowUturnDownIcon className="h-6 mx-auto mb-2" />
                Refund All
            </button>
        </div>
    </div>
  )
}

export default AdminControls